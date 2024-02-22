import { AppFeed } from '../../../app/types/feeds';
import { Button, Icon } from 'semantic-ui-react';
type Props = {
  post:AppFeed
}
export default function PostDetails({post}:Props) {
  return (
    <div className="feed-item">
      <div className="author-info">
        <img src="/images/avatar/small/elliot.jpg" alt="Author Avatar" />
        <div className="author-details">
          <p>{post.author}</p>
          <p>{post.occupation}</p>
          <span>{post.date}</span>
        </div>
      </div>
      <div className="content">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <div className="post-image">
          <img src={post.imageUrl} alt="Post Image" />
        </div>
      </div>
      <div className="statistics">
        <Button icon>
          <Icon name="comment" />
        </Button>
        <span>Likes: {post.likes}</span>
        <span>Views: {post.views}</span>
      </div>
      
    </div>
  );
  
}
