import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Image from "next/image";

interface Article {
  id: number;
  coverImage: string | undefined;
  title: string;
  author: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

interface HomeProps {
  articles: Article[];
}

const Home = ({ articles }: HomeProps) => {
  const router = useRouter();

  const handleReadMoreClick = (id: number) => {
    router.push({
      pathname: "/article",
      query: { id: id },
    });
  };

  return (
    <>
      <Header />

    <div className={styles.container}>
      
      <h1  className={styles.h1}>Artigos</h1>
      <ul  className={styles.ul}>
      <div className={styles.container2}>
        {articles.slice(0, 12).map((article, index) => (
          <a key={index} className={styles.hover_effect} onClick={() => handleReadMoreClick(article.id)}>
          <li  className={styles.li} key={index}>
            <Image  className={styles.img}
              src={article.coverImage}
              alt={article.title}
              width={1280}
              height={720}
            />
            <h2  className={styles.h2}>{article.title}</h2>
            <p  className={styles.p}>{article.author}</p>
          </li>
          </a>
        ))}
        </div>
      </ul>
      
    </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch("https://news-api.lublot.dev/api/posts");
    const data = await response.json();
    return {
      props: {
        articles: data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        articles: [],
      },
    };
  }
};