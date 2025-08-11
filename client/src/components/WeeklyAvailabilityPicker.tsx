import { useMemo, useState, useEffect } from "react";

export type AvailabilitySlot = { start: string; end: string }; // HH:mm
export type AvailabilityItem = { dayOfWeek: number; slots: AvailabilitySlot[] }; // 0=Sun..6=Sat

type Props = {
  value: AvailabilityItem[];
  onChange: (next: AvailabilityItem[]) => void;
  startHour?: number;   // 默认 8
  endHour?: number;     // 默认 22
  stepMinutes?: number; // 默认 30
  weekStartsOn?: 0 | 1; // 默认 1 => 周一
};

const dayLabelsCN = ["周日","周一","周二","周三","周四","周五","周六"];

function pad2(n: number) { return n.toString().padStart(2, "0"); }

function timeList(startHour: number, endHour: number, stepMinutes: number) {
  const out: string[] = [];
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      out.push(`${pad2(h)}:${pad2(m)}`);
    }
  }
  out.push(`${pad2(endHour)}:00`); // 末尾边界
  return out;
}

function gridFromAvailability(value: AvailabilityItem[], times: string[], weekStartsOn: 0|1) {
  const set = new Set<string>();
  const days = [...Array(7)].map((_,i)=> (i + (weekStartsOn===1?1:0)) % 7);
  for (const item of value || []) {
    const col = days.indexOf(item.dayOfWeek);
    if (col === -1) continue;
    for (const slot of item.slots || []) {
      const sIdx = times.indexOf(slot.start);
      const eIdx = times.indexOf(slot.end);
      if (sIdx === -1 || eIdx === -1 || eIdx <= sIdx) continue;
      for (let i = sIdx; i < eIdx; i++) set.add(`${col}@${times[i]}`);
    }
  }
  return set;
}

function availabilityFromGrid(set: Set<string>, times: string[], weekStartsOn: 0|1): AvailabilityItem[] {
  const result: AvailabilityItem[] = [];
  const days = [...Array(7)].map((_,i)=> (i + (weekStartsOn===1?1:0)) % 7);

  for (let col = 0; col < 7; col++) {
    const dayOfWeek = days[col];
    const selectedIdxs: number[] = [];
    for (let i = 0; i < times.length-1; i++) {
      if (set.has(`${col}@${times[i]}`)) selectedIdxs.push(i);
    }
    if (!selectedIdxs.length) { result.push({ dayOfWeek, slots: [] }); continue; }

    const slots: AvailabilitySlot[] = [];
    let startIdx = selectedIdxs[0];
    let prevIdx = selectedIdxs[0];
    for (let k = 1; k < selectedIdxs.length; k++) {
      const cur = selectedIdxs[k];
      if (cur === prevIdx + 1) prevIdx = cur;
      else {
        slots.push({ start: times[startIdx], end: times[prevIdx + 1] });
        startIdx = cur; prevIdx = cur;
      }
    }
    slots.push({ start: times[startIdx], end: times[prevIdx + 1] });
    result.push({ dayOfWeek, slots });
  }
  return result;
}

export default function WeeklyAvailabilityPicker({
  value,
  onChange,
  startHour = 8,
  endHour = 22,
  stepMinutes = 30,
  weekStartsOn = 1,
}: Props) {
  const times = useMemo(() => timeList(startHour, endHour, stepMinutes), [startHour, endHour, stepMinutes]);
  const [grid, setGrid] = useState<Set<string>>(() => gridFromAvailability(value, times, weekStartsOn));
  const [dragging, setDragging] = useState<null | { mode: "add"|"remove"; col: number }>(null);

  useEffect(() => {
    setGrid(gridFromAvailability(value, times, weekStartsOn));
  }, [value, times, weekStartsOn]);

  const toggleCell = (col: number, time: string, force?: "add"|"remove") => {
    setGrid(prev => {
      const next = new Set(prev);
      const key = `${col}@${time}`;
      const has = next.has(key);
      if (force === "add") next.add(key);
      else if (force === "remove") next.delete(key);
      else { if (has) next.delete(key); else next.add(key); }
      return next;
    });
  };

  const commit = (nextSet: Set<string>) => {
    const next = availabilityFromGrid(nextSet, times, weekStartsOn);
    onChange(next);
  };

  const handleMouseDown = (col: number, time: string) => {
    const key = `${col}@${time}`;
    const willAdd = !grid.has(key);
    setDragging({ mode: willAdd ? "add" : "remove", col });
    toggleCell(col, time, willAdd ? "add" : "remove");
  };
  const handleMouseEnter = (col: number, time: string) => {
    if (!dragging || dragging.col !== col) return;
    toggleCell(col, time, dragging.mode);
  };
  const handleMouseUp = () => {
    setDragging(null);
    commit(grid);
  };

  const daysOrder = [...Array(7)].map((_,i)=> (i + (weekStartsOn===1?1:0)) % 7);

  return (
    <div className="w-full select-none" onMouseLeave={handleMouseUp}>
      <div className="grid" style={{ gridTemplateColumns: `120px repeat(7, 1fr)` }}>
        <div></div>
        {daysOrder.map((d) => (
          <div key={d} className="text-center text-sm font-medium py-2">{dayLabelsCN[d]}</div>
        ))}
      </div>

      <div className="border rounded-lg overflow-hidden">
        {times.slice(0, -1).map((t) => (
          <div key={t} className="grid border-b last:border-b-0" style={{ gridTemplateColumns: `120px repeat(7, 1fr)` }}>
            <div className="text-xs text-muted-foreground py-2 px-2 border-r">{t}</div>
            {daysOrder.map((_, col) => {
              const key = `${col}@${t}`;
              const active = grid.has(key);
              return (
                <div
                  key={key}
                  className={`h-8 cursor-pointer border-r last:border-r-0 ${active ? "bg-primary/20" : "hover:bg-accent"}`}
                  onMouseDown={() => handleMouseDown(col, t)}
                  onMouseEnter={() => handleMouseEnter(col, t)}
                  onMouseUp={handleMouseUp}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="text-xs text-muted-foreground mt-2">
        小提示：按住鼠标可拖动批量选择/取消；时间粒度：{stepMinutes} 分钟
      </div>
    </div>
  );
}
