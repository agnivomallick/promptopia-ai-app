'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setMyPost] = useState({prompt: '', tag: ''})
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id")


  useEffect(()=>{
    const getPromptDetails = async ()=>{
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setMyPost({prompt:data.prompt, tag: data.tag})
    }

    if (promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async (e)=>{
    e.preventDefault();

    if (!promptId) return alert("Prompt ID not found.")
    setSubmitting(true)

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method:"PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (response.ok){
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Form 
    type="Edit"
    post={post}
    setPost={setMyPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt