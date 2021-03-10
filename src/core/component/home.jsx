import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ArticleContext } from "../../shared/store";
import { getArticle } from "../api/article";
import "./home.css";

export const Home = () => {
  const [articleList, setArticleList] = useState([]);
  const { article, addArticle, removeArticle } = useContext(ArticleContext);

  useEffect(() => {
    if (article.length == 0) {
      fetchArticle();
    }
  }, []);

  const fetchArticle = async () => {
    let res = await getArticle();
    if (res?.data) {
      setArticleList(res.data);
      for (const e of res.data) {
        addArticle(e);
      }
    }
  };
  const remove = async (value, event) => {
    removeArticle(value);
  };

  return (
    <div className="article">
      <Link to="/article" className="link">
        Create
      </Link>
      {article.map((e) => (
        <div
          key={e.articleId}
          className="display"
          style={{
            border: "1px solid #efefef",
            padding: "20px",
            margin: "20px",
            borderRadius: "10px",
            backgroundColor: "#fff",
          }}
        >
          <button className="remove" onClick={remove.bind(this, e)}>
            Delete
          </button>
          <div dangerouslySetInnerHTML={{ __html: e.articleTxt }}></div>
        </div>
      ))}
    </div>
  );
};
