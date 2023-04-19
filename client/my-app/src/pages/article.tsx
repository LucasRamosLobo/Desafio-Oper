import { GetServerSideProps, NextPage } from "next";
import { useState, useEffect } from "react";
import styles from '../styles/Article.module.css';
import Header from '../components/Header';

interface ArticleProps {
  id: number;
  title: string;
  content: string;
  comments: {
    likes: number; id: number; id_notice: string; email: string; content: string 
}[];
}

const Article: NextPage<ArticleProps> = ({ id, title, content, comments }) => {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [localComments, setLocalComments] = useState(comments);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchComment = async () => {
      if (selectedCommentId !== null) {
        const response = await fetch(`http://localhost:8000/api/posts/${selectedCommentId}/`);
        if (response.ok) {
          const updatedComment = await response.json();
          const updatedComments = localComments.map(comment => {
            if (comment.id === selectedCommentId) {
              return updatedComment;
            }
            return comment;
          });
          setLocalComments(updatedComments);
        } else {
          // tratar erro de obtenção do comentário atualizado
        }
      }
    };
  
    fetchComment();
  }, [selectedCommentId]);

  const handleLikeClick = async (id: number) => {
    const updatedComments = localComments.map(comment => {
      if (comment.id === id) {
        comment.likes++;
      }
      return comment;
    });
    setLocalComments(updatedComments);
  
    const response = await fetch(`http://localhost:8000/api/posts/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      // tratar erro de atualização das curtidas no servidor
    }
  };
  
  const handleCommentClick = (id: number) => {
    setSelectedCommentId(id);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      id: localComments.length + 1,
      id_notice: id.toString(),
      email: email,
      content: comment,
      likes: 0
    };

    // Adiciona o novo comentário à lista de comentários localmente
    setLocalComments([...localComments, newComment]);

    const response = await fetch("http://localhost:8000/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    if (response.ok) {
      setEmail("");
      setComment("");
    }
  };

  const filteredComments = localComments.filter(
    (comment) => comment.id_notice === id.toString()
  );
  
  const commentElements = filteredComments.map((comment) => (
    <div key={comment.id}>
      <p>{comment.email}</p>
      <p>{comment.content}</p>
      <div className={styles.button_container}>
        <button className={styles.button} onClick={() => handleLikeClick(comment.id)}>
          {comment.likes} Curtir
        </button>
    <button className={styles.button} onClick={() => handleCommentClick(comment.id)}>
          Responder
        </button>
      </div>
      {selectedCommentId === comment.id && (
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="comment">Comentário:</label>
            <textarea id="comment" name="comment" />
          </div>
          <button className={styles.button}>Enviar</button>
        </form>
      )}
    </div>
    ));

  return (
    <>
    <Header />
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.comment}>{content}</p>
      <h2 className={styles.h2}>Comentários:</h2>
      {commentElements}
      <h2 className={styles.h2}>Adicionar comentário:</h2>
      <form className={styles.form_container} onSubmit={handleSubmit}>
  <div className = {styles.form_group}>
    <label htmlFor="email" className={styles.form_label}>Email:</label>
    <input
      type="email"
      id="email"
      className={styles.form_input}
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
  </div>
  <div className={styles.form_group}>
    <label htmlFor="comment" className={styles.form_label}>Comentário:</label>
    <textarea
      id="comment"
      className = {styles.form_textarea}
      value={comment}
      onChange={(event) => setComment(event.target.value)}
    />
  </div>
  <button type="submit" className={styles.form_submit}>Enviar</button>
</form>
    </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ArticleProps> = async ({
  query,
}) => {
  const id = query.id as string;
  const res = await fetch(`https://news-api.lublot.dev/api/posts/${id}`);
  const article = await res.json();
  const res2 = await fetch(`http://server:8000/api/posts`);
  const comments = await res2.json();

  return {
    props: {
      id: article.id,
      title: article.title,
      content: article.content,
      comments: comments,
    },
  };
};

export default Article;