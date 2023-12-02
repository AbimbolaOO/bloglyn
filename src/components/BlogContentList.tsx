import styled from '@emotion/styled';

const BlogContentList: React.FC<IBlogContentList> = ({ children }) => {
  return <BlogContentListShell>{children}</BlogContentListShell>;
};
export default BlogContentList;

// === interfaces
interface IBlogContentList {
  children: any;
}

// === styles
const BlogContentListShell = styled.div`
  border: 2px solid green;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
  padding: 48px 32px;
`;
