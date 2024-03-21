import { useState } from "react";
import { Grid, Header, Tab } from "semantic-ui-react";
import { AppFeed } from "../../app/types/feeds";
import PostContentButton from "../PostContentButton";
import { QueryOptions, SortOptions } from "../../app/hooks/firestore/types";
import { useAppSelector } from "../../app/store/store";
import PostList from "./PostList";

type Props = {
  posts: AppFeed[];
  setQuery: (query: QueryOptions[], sort?: SortOptions) => void;
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
};

export default function FeedFilters({
  posts,
  setQuery,
  loadMore,
  hasMore,
  loading,
}: Props) {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_e: any, { activeIndex }: any) => {
    setActiveTab(activeIndex);
    handleSetFilter(activeIndex);
  };

  const handleSetFilter = (activeIndex: number) => {
    let q: QueryOptions[];
    let sort: SortOptions | undefined;
    switch (activeIndex) {
      case 0:
        q = [
          {
            attribute: "date",
            operator: "<=",
            value: new Date().toISOString(),
          },
        ];
        sort = { attribute: "date", order: "asc" };
        break;
      case 1:
        q = [
          {
            attribute: "date",
            operator: "<=",
            value: new Date().toISOString(),
          },
        ];
        sort = { attribute: "date", order: "desc" };
        break;
      case 2:
        q = [
          {
            attribute: "authorUid",
            operator: "==",
            value: currentUser?.uid || "",
          },
        ];
        sort = { attribute: "date", order: "desc" }; // Assuming you want the user's posts sorted by date in descending order
        break;
      default:
        q = [
          {
            attribute: "date",
            operator: "<=",
            value: new Date().toISOString(),
          },
        ];
        sort = { attribute: "date", order: "asc" };
        break;
    }
    setQuery(q, sort); // Pass sort options to the parent component
  };

  const panes = [
    { menuItem: "For you" },
    { menuItem: "Recent" },
    { menuItem: "Your Posts" },
  ];

  return (
    <Grid style={{ margin: "0", padding: "0" }}>
      <Grid.Column computer={14} tablet={12} mobile={16}>
        <div className="flex items-center justify-between">
          <div>
            <Header style={{ fontSize: "2rem" }}>Feed</Header>
            <p className="feed-header-p">
              Explore different content you'd love
            </p>
          </div>
          <PostContentButton />
        </div>
      </Grid.Column>
      <Grid.Column computer={14} tablet={12} mobile={16}>
        <Tab
          onTabChange={handleTabChange}
          panes={panes}
          menu={{
            secondary: true,
            pointing: true,
            className: "menu-with-gaps",
            style: { display: "flex", justifyContent: "space-between" },
          }}
          activeIndex={activeTab}
        />
        <PostList
          posts={posts}
          hasMore={hasMore}
          loadMore={loadMore}
          loading={loading}
        />
      </Grid.Column>
    </Grid>
  );
}
