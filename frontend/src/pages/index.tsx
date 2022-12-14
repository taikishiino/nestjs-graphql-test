import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useGetPosts from '@/hooks/useGetPosts'
import useCreatePost from '@/hooks/useCreatePost'
import useSubscribePost from '@/hooks/useSubscribePost'
import useSound from 'use-sound';

type Props = {
  title: string;
};

const Home: NextPage<Props> = (props) => {
  const { posts, error, loading, refetch } = useGetPosts();

  const Status = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ネットワークが不安定です: {JSON.stringify(error)}</p>;
    return <></>
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>nestjs-graphql-test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{props.title}</h1>
        <AddPost />
        <SubscribePost posts={posts} refetch={() => refetch()} />
        <Status />
        <ul>
          {posts.map((post: any, i: number) => <li key={i}>{post.title}</li>)}
        </ul>
      </main>
    </div>
  )
}

const AddPost = () => {
  const [title, setTitle] = useState("");
  const { createPost, post, error, loading } = useCreatePost();

  const Status = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {JSON.stringify(error)}</p>;
    if (post) return <p>注文しました！</p>;
    return <></>;
  };

  return (
    <>
      <form onSubmit={e => {
        e.preventDefault();
        createPost({
          variables: {
            input: {
              title,
              type: "type1",
              contentPath: title,
              md5Hash: "md5Hash1"
            }
          }
        });
        setTitle("")
      }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <button type='submit'>注文</button>
      </form>
      <Status />
    </>
  );
}

type SubscribePostProps = {
  posts: any[]
  refetch: () => void
}
const SubscribePost = (props: SubscribePostProps) => {
  const { posts, refetch } = props;
  const { data, error } = useSubscribePost();
  const base64 =
      "SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjQwLjEwMQAAAAAAAAAAAAAA//NwwAAAAAAAAAAAAEluZm8AAAAPAAAADgAAAiQAYWFhYWFhYW1tbW1tbW15eXl5eXl5hoaGhoaGhpKSkpKSkpKenp6enp6eqqqqqqqqqra2tra2tra2wsLCwsLCws/Pz8/Pz8/b29vb29vb5+fn5+fn5/Pz8/Pz8/P/////////AAAAAExhdmM1Ni42MAAAAAAAAAAAAAAAACQAAAAAAAAAAAIkrpFKWwAAAAAAAAAAAAAAAAD/8xDEAALIAqgBQBAA//8/WH///UCAIAgq///zEsQBAzlK2AGAEAD/yvo+C///8WX5fwX/yP/zEMQCA2k+rAHAUACBbNb/q////0JgUmqH//MQxAEDATqsCAAOcMIP/ikVK3///icOwD7/8xDEAgNROqAQABpwNf/0AGSe///+M5Bq+P/zEMQBAwk6kAAAGnB+f/zIJd////h9KNX4//MQxAECyTqMAAAUcA7/8qEj2///g6eq+EX/8xDEAgNJOoQAA1UAn/8gAAmd///4OifVEP/zEMQBAuk6nDAADnBB8Bv/4a////FIeleB//MSxAIDETp8AANVCEZ//MQ3G///+wdq+Ai3//MQxAMC0TqAAAKPAP5QFf///xMGqv/cJv//8xDEBALhOowBQDgA54Pv///xMXr/768Ic//zEMQFA9kWhAGAOADqb8VjB+pv/4jdFUxB//MQxAIAAANIAcAAAE1FMy45OS41VVVVVVU=";
  const dataURI = `data:audio/mp3;base64,${base64}`;
  const [play] = useSound(dataURI);
  // const sound = new Audio(dataURI);
  // sound.play();

  const Status = () => {
    if (error) return <p>ネットワークが不安定です: {JSON.stringify(error)}</p>;
    if (data && !posts.find(p => p.id === data.id)) {
      play();
      return <button onClick={refetch}>追加で読み込む...</button>;
    }
    return <></>
  };

  return <Status />
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      title: "nestjs-graphql-test",
    },
  };
};

export default Home
