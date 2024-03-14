import { format, differenceInDays, isValid } from "date-fns";
import { AppFeed } from "../../../app/types/feeds";
type Props = {
  post: AppFeed;
};

export default function PostDetailsHeader({ post }: Props) {
  const formatDateDifference = (postDate: string | number | Date) => {
    if (!isValid(new Date(postDate))) {
      return "Invalid date";
    }

    const currentDate = new Date();
    const daysDifference = differenceInDays(currentDate, new Date(postDate));
    const formattedDate = format(new Date(postDate), "MMM yyyy");
    return `${formattedDate}, ${daysDifference} day${daysDifference !== 1 ? "s" : ""} so far`;
  };

  return (
    <div
      style={{
        marginTop: "1rem",
        border: "none",
        color: "black",
        width: "100%",
        borderBottom: "4px solid #543EE0",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Post Analysis</h1>

      <p style={{ marginBottom: "1rem" }}>
        {formatDateDifference(new Date(post.date))}
      </p>
    </div>
  );
}
