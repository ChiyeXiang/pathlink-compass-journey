import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

const reviews = [
  {
    name: "Sarah M.",
    username: "@sarah_m",
    body: "Leland helped me get into my dream MBA program. The coaching was incredible!",
    img: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e185d7ba-3bdc-4abe-ab42-f6ce9ff65c77",
    rating: 5.0,
    program: "MBA"
  },
  {
    name: "Michael R.",
    username: "@michael_r",
    body: "Found the perfect mentor for my consulting applications. Highly recommend!",
    img: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/89ceadb9-64f1-4ad9-a87c-9eb6f86f7ad8",
    rating: 5.0,
    program: "Consulting"
  },
  {
    name: "Emily L.",
    username: "@emily_l",
    body: "The GRE prep coaching was exactly what I needed. Scored 330+!",
    img: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d9eef30c-4e5f-4e8a-a753-c779448ef3c7",
    rating: 5.0,
    program: "GRE"
  },
  {
    name: "David K.",
    username: "@david_k",
    body: "Medical school application process was so much smoother with Leland.",
    img: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/18791306-949b-43c7-848f-18b3797ab1ab",
    rating: 5.0,
    program: "Medical School"
  },
  {
    name: "Jessica W.",
    username: "@jessica_w",
    body: "Law school applications made easy. My mentor was amazing!",
    img: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0176511e-983c-4671-aba8-5af8ad3166d1",
    rating: 5.0,
    program: "Law School"
  },
  {
    name: "Alex T.",
    username: "@alex_t",
    body: "Investment banking prep was intense but totally worth it. Got the job!",
    img: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/248239b2-edab-4e49-8cee-084c99d9f725",
    rating: 5.0,
    program: "Investment Banking"
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
  rating,
  program,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  rating: number;
  program: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6",
        "border-gray-950/[.1] bg-white hover:bg-gray-50/[.05]",
        "shadow-sm hover:shadow-md transition-all duration-200"
      )}
    >
      <div className="flex flex-row items-center gap-3 mb-4">
        <img className="rounded-full w-12 h-12 object-cover" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-gray-900">
            {name}
          </figcaption>
          <p className="text-xs text-gray-500">{username}</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      <blockquote className="text-sm text-gray-700 leading-relaxed mb-3">{body}</blockquote>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{program}</span>
        <span className="text-xs text-green-600 font-medium">✓ Accepted</span>
      </div>
    </figure>
  );
};

export function ReviewMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-16">
      <Marquee pauseOnHover className="[--duration:30s] mb-8">
        {firstRow.map((review, index) => (
          <ReviewCard key={`${review.username}-${index}`} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={`${review.username}-${index}`} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
    </div>
  );
} 