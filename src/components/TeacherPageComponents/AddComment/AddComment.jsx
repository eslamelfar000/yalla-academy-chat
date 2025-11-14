import { Rating } from "@smastrom/react-rating";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../config/axios.config";
import { toast } from "sonner";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function AddComment({ teacherId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (reviewData) => {
      const response = await api.post(
        `teacher-review/${teacherId}`,
        reviewData
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate teacher data to refresh reviews
      queryClient.invalidateQueries(["teacher-data", teacherId]);

      // Reset form after successful submission
      setRating(0);
      setComment("");

      toast.success("Review submitted successfully!", {
        duration: 5000,
        style: { gap: "1rem" },
        icon: <CheckBadgeIcon className="size-8 text-green-500" />,
        action: { label: "close" },
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to submit review", {
        duration: 5000,
        style: { gap: "1rem" },
        action: { label: "close" },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    const reviewData = {
      rate: rating.toString(),
      comment: comment.trim(),
    };

    mutate(reviewData);
  };

  return (
    <>
      <div className="cover p-5 bg-white rounded-md mt-5 shadow-lg">
        <h2 className="text-xl opacity-80 pb-5 mb-5 text-center border-b-1 border-solid border-second-dark">
          Give your feedback
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="rate flex justify-center">
            <Rating
              style={{ maxWidth: 200 }}
              value={rating}
              onChange={setRating}
              isRequired
            />
          </div>

          <textarea
            cols="30"
            rows="10"
            placeholder="Your comment"
            value={comment}
            className="border-1 border-second-dark border-solid focus:outline-none p-4 rounded-md focus:border-main text-sm"
            onChange={(e) => setComment(e.target.value)}
            disabled={isPending}
          ></textarea>
          {localStorage.getItem("yall_user_data") &&
          Cookies.get("yall_auth_token") &&
          JSON.parse(localStorage.getItem("yall_user_data"))?.assiend_teacher
            ?.teacher?.id.toString() === teacherId.toString() ? (
            <button
              type="submit"
              disabled={rating === 0 || !comment.trim() || isPending}
              className={`btn ${
                rating !== 0 && comment.trim() && !isPending
                  ? ""
                  : "cursor-not-allowed opacity-50"
              } bg-white text-main hover:bg-main border-1 border-solid border-main hover:text-white transition-colors`}
            >
              {isPending ? (
                <BtnLoading text="Submitting..." size="sm" />
              ) : (
                "Submit"
              )}
            </button>
          ) : (
            <button
              type="button"
              className={`btn bg-white text-main hover:bg-main border-1 border-solid border-main hover:text-white transition-colors ${
                rating !== 0 && comment.trim() && !isPending
                  ? ""
                  : "cursor-not-allowed opacity-50"
              }`}
              disabled={rating === 0 || !comment.trim() || isPending}
              onClick={() => {
                toast.warning("You are not assigned to this teacher", {
                  duration: 5000,
                  action: {
                    label: "close",
                  },
                });
              }}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default AddComment;
