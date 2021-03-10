import { constant } from "../../shared/constant";
import { Delete, Get, Post } from "./api";

export const postCreateArticle = async (body) => {
  let res = await Post(`${constant._ARTICLE}/article`, body);
  return res;
};

export const getArticle = async () => {
  return await Get(`${constant._ARTICLE}/list`);
};

export const deleteArticle = async (id) => {
  return await Delete(`${constant._ARTICLE}/article?id=${id}`)
};