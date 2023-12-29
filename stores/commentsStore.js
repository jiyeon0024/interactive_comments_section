"use client";

import { comment } from "postcss";
import { create } from "zustand";

const fetchComments = async () => {
  if (localStorage.getItem("comments")) {
    let comments = localStorage.getItem("comments");
    return JSON.parse(comments);
  }
  const res = await fetch("./data.json");
  const val = await res.json();
  console.log(val);
  return val.comments;
};

export const useCommentsStore = create((set, get) => ({
  comments: [],

  addComment: (reply) =>
    set((state) => {
      let _comments = [...state.comments];
      _comments.push(reply);
      localStorage.setItem("comments", JSON.stringify(_comments));
      return { comments: _comments };
    }),

  removeComment: (id) =>
    set((state) => {
      let _comments = [];
      state.comments.forEach((i) => {
        if (i.id !== id) {
          _comments.push(i);
        }
      });
      localStorage.setItem("comments", JSON.stringify(_comments));
      return { comments: _comments };
    }),

  editComment: (id, reply) =>
    set((state) => {
      let _comments = [...state.comments];
      _comments.forEach((i) => {
        if (i.id === id) {
          i.content = reply;
        }
      });
      localStorage.setItem("comments", JSON.stringify(_comments));
      return { comments: _comments };
    }),

  addReply: (reply, id) =>
    set((state) => {
      let _comments = [...state.comments];

      _comments.forEach((c, i) => {
        if (c.id === id) {
          c.replies.push(reply);
        }
      });
      localStorage.setItem("comments", JSON.stringify(_comments));
      return { comments: _comments };
    }),

  removeReply: (id) =>
    set((state) => {
      let _comments = [];
      state.comments.forEach((c) => {
        if (c.id !== id) {
          _comments.push(c);
        }
      });
      _comments.forEach((c, i) => {
        if (c.replies.length > 0) {
          c.replies.forEach((r, index) => {
            if (r.id === id) {
              c.replies.splice(index, 1);
            }
          });
        }
      });

      localStorage.setItem("comments", JSON.stringify(_comments));
      return { comments: _comments };
    }),

  editReply: (id, reply) =>
    set((state) => {
      let _comments = [...state.comments];
      _comments.forEach((c) => {
        if (c.id === id) {
          c.content = reply;
        }
      });

      _comments.forEach((c, i) => {
        if (c.replies.length > 0) {
          c.replies.forEach((r, index) => {
            if (r.id === id) {
              r.content = reply;
            }
          });
        }
      });
      localStorage.setItem("comments", JSON.stringify(_comments));
      return { comments: _comments };
    }),

  //   addRepliesReply: (id, reply) => {
  //     set((state) => {
  //       let _comments = [...state.comments];

  //       let arr = _comments.map((i) => {
  //         if (i.replies.length > 0) {
  //           let arr = i.replies.map((j) => {
  //             if (j.id === id) {
  //               return { ...j, reply: [reply] };
  //             } else {
  //               return j;
  //             }
  //           });
  //           console.log(arr);
  //           return { ...i, replies: arr };
  //         }
  //         return i;
  //       });
  //       console.log(_comments);
  //       localStorage.setItem("comments", JSON.stringify(arr));
  //       return { comments: arr };
  //     });
  //   },

  removeRepliesReply: (id) => {
    let _comments = [];
    state.comments.forEach((i) => {
      if (i.replies.length > 0) {
      }
    });
  },
}));

fetchComments().then((comments) => {
  useCommentsStore.setState({ comments });
});
