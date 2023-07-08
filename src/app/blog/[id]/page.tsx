import { FunctionComponent } from 'react';
import { Post as TPost } from '@/types/post';
import { notFound } from 'next/navigation';


interface PageProps {
  params: {
    id: string;
  };
}



// generateStaticParams baihgvi ved dynamic page render hiih ved true baih
// dynamicParams default value true
// export const dynamicParams = false;

// Post of details info's title to set either on the page title and description
export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  const blog = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => res.json());

  return {
    title: blog.title,
    description: blog.body,
  };
}

export async function generateStaticParams() {
  const posts = await fetch(`https://jsonplaceholder.typicode.com/posts/`).then((res) => res.json());

  return posts.map((post: any) => ({
    id: post.id.toString(),
  }));
}

const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (res.status === 404) {
        notFound();
    }

    if (res.status !== 200) {
        throw new Error('Алдаа гарлаа');
    }

  const post: TPost = await res.json();

  return (
    <>
      <h1 className='text-2xl uppercase pb-2'>{post.title}</h1>
      <article>
        <p>{post.body}</p>
      </article>
    </>
  );
};

export default Page;
