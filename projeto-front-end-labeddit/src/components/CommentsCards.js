import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import GlobalStateContext from "../global/GlobalStateContext"
import Like from "../assets/like.png"
import Dislike from "../assets/dislike.png"
import LikeClicked from "../assets/like-clicked.png"
import DislikeClicked from "../assets/dislike-clicked.png"
import { BASE_URL } from "../constants/urls"
import { DivBotoes } from '../styles/Post-style'
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const CommentsCards = (props) => {
    const {values, requests} = useContext(GlobalStateContext);
    const { headers } = values
    const {getPosts} = requests

    const handleVote = (id, direction) => {
        const body = {
            direction: direction
        }

        if (direction === 1) {
            axios
                .post(`${BASE_URL}/comments/${id}/votes`, body, headers)
                .then((res) => {
                    getPosts();
                })
                .catch((err) => {
                    console.log(err.response)
                })
        }
        else if (direction === -1) {
            axios
                .put(`${BASE_URL}/comments/${id}/votes`, body, headers)
                .then((res) => {
                    getPosts();
                })
                .catch((err) => {
                    console.log(err.response)
                })
        }
        else {
            axios
                .delete(`${BASE_URL}/comments/${id}/votes`, headers)
                .then((res) => {
                    getPosts();
                })
                .catch((err) => {
                    console.log(err.response)
                })
        }
    }

    const createLikeVote = () => {
        if (props.comment.userVote === 1) {
            handleVote(props.comment.id);
        }
        else {
            handleVote(props.comment.id, 1);
        }
    }

    const createDislikeVote = () => {
        if (props.comment.userVote === -1) {
            handleVote(props.comment.id);
        }
        else {
            handleVote(props.comment.id, -1);
        }
    }

    return (
        <Card key={props.comment.id} bg={'secondary'} style={{ color: "white" }}>
            <Card.Header as={"span"}>Enviado por: {props.comment.username}</Card.Header>
            <Card.Text>{props.comment.body}</Card.Text>
            <DivBotoes key={props.comment.id}>
                <Button variant="success" onClick={createLikeVote}>{props.comment.userVote === 1 ? <Card.Img variant="bottom" src={LikeClicked} alt="like-comment" style={{ width: "20px" }} /> : <Card.Img variant="bottom" src={Like} alt="like-comment" style={{ width: "20px" }} />}</Button>
                {props.comment.voteSum === null ? <span>0</span> : <span>{props.comment.voteSum}</span>}
                <Button variant="danger" onClick={createDislikeVote}>{props.comment.userVote === -1 ? <Card.Img variant="bottom" src={DislikeClicked} alt="dislike-comment" style={{ width: "20px" }} /> : <Card.Img variant="bottom" src={Dislike} alt="dislike-comment" style={{ width: "20px" }} />}</Button>
            </DivBotoes>
        </Card>
    )

}

export default CommentsCards;