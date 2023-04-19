import { GetServerSideProps, NextPage } from "next";
import { useState, useEffect } from "react";

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
    if (selectedCommentId !== null) {
      fetch(`http://localhost:8000/api/posts/${selectedCommentId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }, [selectedCommentId]);

  const handleLikeClick = async (id: number) => {
    setSelectedCommentId(id);
  };
  
  

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
      <button onClick={() => handleLikeClick(comment.id)}>{comment.likes}Curtidas</button>
      <button>Responder comentário</button>
    </div>
  ));

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <h2>Comentários:</h2>
      {commentElements}
      <h2>Adicionar comentário:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment">Comentário:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
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