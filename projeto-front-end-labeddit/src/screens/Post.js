import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import GlobalStateContext from "../global/GlobalStateContext"
import { BASE_URL } from "../constants/urls"
import { goToFeed } from '../routes/Coordinator'
import { Detalhes, Comentarios, DivForm, StyledForm, Textarea, DivBody } from '../styles/Post-style'
import { useForm } from '../hooks/useForm'
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import CommentsCards from '../components/CommentsCards'
import Loading from "../assets/Loading.gif"

export default function Post() {
  const navigate = useNavigate();
  const { states, setters, values } = useContext(GlobalStateContext)
  const { headers } = values
  const { posts, comments, postInfo } = states
  const { setPosts, setComments, setPostInfo } = setters
  const params = useParams();
  const token = window.localStorage.getItem("token");
  const { form, onChange, cleanFields } = useForm({ body: "" })
  const [loading, setLoading] = useState(false);

  const getPost = () => {
    const postDetails = [];
    posts && posts.forEach((post) => {
      if (post.id === params.id) {
        postDetails.push(post)
      }
    })
    setPostInfo(postDetails);
  }

  const getComments = () => {
    axios
      .get(`${BASE_URL}/posts/${params.id}/comments`, headers)
      .then((res) => {
        setComments(res.data)
      })
      .catch((err) => {
        alert(err.response.data);
      })
  }

  const createComment = (event) => {
    event.preventDefault();
    axios
      .post(`${BASE_URL}/posts/${params.id}/comments`, form, headers)
      .then((res) => {
        alert(`Comentario adicionado com sucesso!`)
        getComments()
        cleanFields()
      })
      .catch((err) => {
        alert(err.response.data)
      })
  }

  useEffect(() => {
    getPost();
    setTimeout(() => {
      setLoading(true)
    }, 2000);
  }, [])

  useEffect(() => {
    getComments();
  }, [comments])

  const showPostDetails = postInfo && postInfo.map((post) => {
    return (
      <Card key={post.id} bg={"light"}>
        <Card.Header as={"span"}>Enviado por: {post.username}</Card.Header>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.body}</Card.Text>
      </Card>
    )
  })

  const commentsMap = comments && comments.map((comment) => {
    return (
      <CommentsCards comment={comment} />
    )
  })

  return (

    <DivBody>
      <Button variant='dark' onClick={() => goToFeed(navigate)} style={{ alignSelf: "center", margin: "20px" }}>Voltar</Button>
      {loading && showPostDetails ?
        <>
          <Detalhes>
            {showPostDetails}
          </Detalhes>
          <DivForm>
            <StyledForm onSubmit={createComment}>
              <label htmlFor="body"></label>
              <Textarea
                type="text"
                name='body'
                placeholder='Comentario'
                onChange={onChange}
                value={form.body}
                required
              />
              <Button variant='dark' type="submit" style={{marginBottom: "20px"}}>Enviar</Button>
            </StyledForm>
          </DivForm>
          <Comentarios>
            {commentsMap.length === 0 ? <Card bg="secondary"><Card.Text>Sem comentários</Card.Text></Card> : commentsMap}
          </Comentarios>
        </>
        : <img src={Loading} alt="Loading" style={{width: "320px", margin: "auto"}}/>}
    </DivBody>

  )
}
