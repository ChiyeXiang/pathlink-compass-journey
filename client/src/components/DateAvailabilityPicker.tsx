import { useEffect, useMemo, useState } from "react";

export type TimeSlot = { start: string; end: string };          // HH:mm
export type DateAvailability = { date: string; slots: TimeSlot[] }; // YYYY-MM-DD

type Props = {
  value: DateAvailability[];
  onChange: (next: DateAvailability[]) => void;
  startHour?: number;   // 默认 8
  endHour?: number;     // 默认 22
  stepMinutes?: number; // 默认 30
};

const pad2 = (n: number) => n.toString().padStart(2, "0");
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

function timeList(startHour: number, endHour: number, stepMinutes: number) {
  const out: string[] = [];
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += stepMinutes) out.push(`${pad2(h)}:${pad2(m)}`);
  }
  out.push(`${pad2(endHour)}:00`);
  return out;
}

function compress(times: string[], selectedIdxs: number[]): TimeSlot[] {
  if (!selectedIdxs.length) return [];
  const slots: TimeSlot[] = [];
  let startIdx = selectedIdxs[0];
  let prevIdx = selectedIdxs[0];
  for (let i = 1; i < selectedIdxs.length; i++) {
    const cur = selectedIdxs[i];
    if (cur === prevIdx + 1) prevIdx = cur;
    else {
      slots.push({ start: times[startIdx], end: times[prevIdx + 1] });
      startIdx = cur; prevIdx = cur;
    }
  }
  slots.push({ start: times[startIdx], end: times[prevIdx + 1] });
  return slots;
}

export default function DateAvailabilityPicker({
  value,
  onChange,
  startHour = 8,
  endHour = 22,
  stepMinutes = 30,
}: Props) {
  const times = useMemo(() => timeList(startHour, endHour, stepMinutes), [startHour, endHour, stepMinutes]);

  // 所有已选日期（排序去重）
  const [dateList, setDateList] = useState<string[]>([]);
  // 当前正在编辑的日期
  const [activeDate, setActiveDate] = useState<string | null>(null);
  // 网格：某天选中的行索引集合
  const [grid, setGrid] = useState<Record<string, Set<number>>>({});
  const [dragging, setDragging] = useState<null | { mode: "add" | "remove"; date: string }>(null);

  // 将外部 value 同步进组件状态
  useEffect(() => {
    const dl = (value || []).map(v => v.date).sort();
    const next: Record<string, Set<number>> = {};
    (value || []).forEach(d => {
      const set = new Set<number>();
      (d.slots || []).forEach(s => {
        const sIdx = times.indexOf(s.start);
        const eIdx = times.indexOf(s.end);
        if (sIdx >= 0 && eIdx > sIdx) for (let i = sIdx; i < eIdx; i++) set.add(i);
      });
      next[d.date] = set;
    });
    setDateList(dl);
    setGrid(next);
    // 若没有 activeDate，默认选第一个
    setActiveDate(prev => prev && dl.includes(prev) ? prev : dl[0] ?? null);
  }, [value, times]);

  // 把内部 grid 写回外部 value
  const commit = (dates: string[], g: Record<string, Set<number>>) => {
    const next: DateAvailability[] = dates.map(d => {
      const idxs = Array.from(g[d] || []).sort((a, b) => a - b);
      return { date: d, slots: compress(times, idxs) };
    });
    onChange(next);
  };

  // 添加一个日期（只在选择器选中时添加）
  const addDate = (date: string) => {
    if (!isDate(date)) return;
    if (dateList.includes(date)) { setActiveDate(date); return; }
    const nextDates = [...dateList, date].sort();
    const nextGrid = { ...grid, [date]: new Set<number>() };
    setDateList(nextDates);
    setGrid(nextGrid);
    setActiveDate(date);
    commit(nextDates, nextGrid);
  };

  // 删除当前日期
  const removeDate = (date: string) => {
    const nextDates = dateList.filter(d => d !== date);
    const nextGrid = { ...grid };
    delete nextGrid[date];
    setDateList(nextDates);
    setGrid(nextGrid);
    // 选择一个新的激活日期
    const nextActive = nextDates.length ? nextDates[Math.max(0, nextDates.indexOf(date) - 1)] ?? nextDates[0] : null;
    setActiveDate(nextActive);
    commit(nextDates, nextGrid);
  };

  // 切换单格
  const toggleCell = (date: string, rowIdx: number, force?: "add" | "remove") => {
    setGrid(prev => {
      const daySet = new Set(prev[date] ?? []);
      const has = daySet.has(rowIdx);
      if (force === "add") daySet.add(rowIdx);
      else if (force === "remove") daySet.delete(rowIdx);
      else { if (has) daySet.delete(rowIdx); else daySet.add(rowIdx); }
      const next = { ...prev, [date]: daySet };
      // 即改即存，保持外部同步
      commit(dateList, next);
      return next;
    });
  };

  const handleMouseDown = (date: string, rowIdx: number) => {
    const willAdd = !(grid[date] || new Set<number>()).has(rowIdx);
    setDragging({ mode: willAdd ? "add" : "remove", date });
    toggleCell(date, rowIdx, willAdd ? "add" : "remove");
  };
  const handleMouseEnter = (date: string, rowIdx: number) => {
    if (!dragging || dragging.date !== date) return;
    toggleCell(date, rowIdx, dragging.mode);
  };
  const handleMouseUp = () => setDragging(null);

  return (
    <div className="w-full" onMouseLeave={handleMouseUp}>
      {/* 顶部：添加日期 */}
      <div className="flex items-center gap-2 mb-3">
        <input
          type="date"
          className="border rounded px-3 py-2"
          onChange={(e) => e.target.value && addDate(e.target.value)}
          placeholder="选择日期后自动添加"
        />
        <span className="text-xs text-muted-foreground">选择日期后会自动添加到下方列表</span>
      </div>

      {/* 日期标签（只展示，不画网格），点击切换当前活跃日期 */}
      {dateList.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {dateList.map(d => {
            const active = d === activeDate;
            return (
              <div
                key={d}
                className={`px-3 py-1 rounded-full border text-sm cursor-pointer ${active ? "bg-primary text-primary-foreground border-transparent" : "border-border hover:bg-accent"}`}
                onClick={() => setActiveDate(d)}
                title={`编辑 ${d}`}
              >
                {d}
                <button
                  className="ml-2 text-xs opacity-80 hover:opacity-100"
                  onClick={(e) => { e.stopPropagation(); removeDate(d); }}
                  title="移除此日期"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* 只为当前激活日期渲染网格 */}
      {activeDate ? (
        <div className="border rounded-lg overflow-hidden">
          {times.slice(0, -1).map((t, rowIdx) => {
            const active = grid[activeDate!]?.has(rowIdx);
            return (
              <div
                key={t}
                className="grid border-b last:border-b-0"
                style={{ gridTemplateColumns: `100px 1fr` }}
              >
                <div className="text-xs text-muted-foreground py-2 px-2 border-r">{t}</div>
                <div
                  className={`h-8 cursor-pointer ${active ? "bg-primary/20" : "hover:bg-accent"}`}
                  onMouseDown={() => handleMouseDown(activeDate!, rowIdx)}
                  onMouseEnter={() => handleMouseEnter(activeDate!, rowIdx)}
                  onMouseUp={handleMouseUp}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">请先在上方选择一个日期</div>
      )}

      <div className="text-xs text-muted-foreground mt-2">
        小提示：你可以先选一个日期并勾选时间；若还需其他日期，再通过上方日期选择器继续添加。按住鼠标可拖动批量选择/取消；时间粒度：{stepMinutes} 分钟
      </div>
    </div>
  );
}
