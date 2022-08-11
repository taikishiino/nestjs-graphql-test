import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import usePosts from '@/hooks/usePosts'

type Props = {
  title: string;
};

const Home: NextPage<Props> = (props) => {
  const { posts, error, loading } = usePosts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  console.warn("posts: ", posts)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{props.title}</h1>

        <ul>
          {posts.map((post: any, index: any) => {
            return <li key={index}>{post.title}</li>
          })}
        </ul>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      title: "Hello, GraphQL!",
    },
  };
};

export default Home
