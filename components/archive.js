export default function Archive({ blocks }) {
  return <div className="article-body">{blocks.map((block,index) => {const Tag=block.tag;return <Tag key={index}>{block.text}</Tag>;})}</div>;
}
