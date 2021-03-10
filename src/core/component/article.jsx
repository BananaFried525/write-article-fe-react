import { Editor } from "react-draft-wysiwyg";
import { useState, useRef, useEffect, useContext } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useHistory } from "react-router";
// import { postCreateArticle } from "../api/article.jsx";
import "./article.css";
import { ArticleContext } from "../../shared/store.jsx";

export const Article = () => {
  const [editorState, onEditorStateChange] = useState(
    EditorState.createEmpty()
  );
  const editorReference = useRef(null);
  const rawContent = convertToRaw(editorState.getCurrentContent());
  const customEntityTransform = (entity, text) => {
    if (entity.type !== "LINK") return;
    return `<a href="${entity.data.url}" target="_blank">${text}</a>`;
  };
  const markUp = draftToHtml(rawContent, {}, true, customEntityTransform);
  let history = useHistory();
  const { addArticle } = useContext(ArticleContext);

  useEffect(() => {
    editorReference.current.focus();
  }, [editorReference]);

  // function
  const submitForm = async (event) => {
    event.preventDefault();
    let body = {
      articleId: Math.random() * 10 + "",
      articleName: Math.random() + "",
      articleTxt: markUp,
    };
    addArticle(body);
    // let res = await postCreateArticle(body);
    // if (res?.data === "Success") {
    //   onEditorStateChange(EditorState.createEmpty());
    history.push("/");
    // } else {
    //   console.log(res);
    // }
  };

  const resetForm = (event) => {
    event.preventDefault();
    onEditorStateChange(EditorState.createEmpty());
    history.push("/");
  };

  return (
    <div className="article">
      <form onSubmit={submitForm} onReset={resetForm}>
        <div className="Header"></div>
        <div className="content">
          <Editor
            editorState={editorState}
            editorRef={(ref) => {
              editorReference.current = ref;
            }}
            placeholder="Type..."
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        <div className="footer">
          <button
            type="submit"
            className="submit"
            disabled={editorState.getCurrentContent().getPlainText() === ""}
          >
            Submit
          </button>
          <button type="reset" className="reset">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
