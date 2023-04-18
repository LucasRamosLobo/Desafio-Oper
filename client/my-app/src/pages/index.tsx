import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import styles from '../styles/Home.module.css';

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
    <div className={styles.container}>
      <h1  className={styles.h1}>Mini Blog <span>Processo Seletivo Oper</span></h1>
      <ul  className={styles.ul}>
        {articles.slice(0, 10).map((article, index) => (
          <li  className={styles.li} key={index}>
            <h2  className={styles.h2}>{article.title}</h2>
            <p  className={styles.p}>{article.author}</p>
            <img  className={styles.img}
              src={article.coverImage}
              alt={article.title}
              width={1280}
              height={720}
            />
            <button  className={styles.button} onClick={() => handleReadMoreClick(article.id)}>
              Read more
            </button>
          </li>
        ))}
      </ul>
    </div>
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