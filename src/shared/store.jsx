import { createContext, useReducer } from "react";

export const ArticleContext = createContext({});

const initialState = {
  article: [],
};

const articleReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ARTICLE":
      return {
        ...state,
        article: [...state.article, action.payload],
      };
    case "REMOVE_ARTICLE":
      var a = state.article
      a.splice(state.article.indexOf(action.payload),1)
      return {
        ...state,
        article: a
      };
    default:
      break;
  }
};

export const ArticleProvider = ({ children }) => {
  const [articleState, articleDispatch] = useReducer(
    articleReducer,
    initialState
  );

  const { article } = articleState;
  const addArticle = (payload) => {
    articleDispatch({ type: "ADD_ARTICLE", payload });
  };
  const removeArticle = (payload) => {
    articleDispatch({ type: "REMOVE_ARTICLE", payload });
  };
  return (
    <ArticleContext.Provider value={{ article, addArticle, removeArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};
