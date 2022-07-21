import {GET_ALL_LINKS, PAGINATE, ADD_VOTE} from "../../graphql/queries"
import { useQuery, NetworkStatus, useMutation } from '@apollo/client'
import {InView} from 'react-intersection-observer';
import * as React from 'react';
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './Posts.module.css'
import Dialog from '@mui/material/Dialog'
import { useAuth } from '../../pages/auth';

const Post = ({description, url, votes, id}) => {
    const { isSignedIn } = useAuth();
    let voteNames = votes.map((data)=> {return data.user.name})
    let visibleVotes = votes.slice(0,3);
    if(!url.startsWith('http')) {url = 'https://' + url};
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const VotesForm = ({ open, handleClose }) => {

      const Form = ({handleClose}) => {
          return (
              <form>
              <h3> Users who upvoted {description}</h3>
              {(!voteNames.length) ?  <p>No Upvotes</p> :<></>}
              {voteNames.map(vote => (
							<p key={vote.id}>
								{vote}
							</p>
						))}
                  <Button  onClick={handleClose}>
                  Cancel
                  </Button>
              </form>
          )
      }
  
      return (
          <Dialog open={open} onClose={handleClose}>
           <Form handleClose={handleClose}/>   
          </Dialog>
        );
  }


  const [UpVote] = useMutation(ADD_VOTE, {
            refetchQueries: [PAGINATE],
        });

  const onVote = (e) => {
    e.preventDefault();
    if(isSignedIn()) {
      UpVote({variables: { linkId: id, }})
    }
    else {
      alert('AUTHENFICATE FIRST');
    }
}
    return    (
    <Card sx={{ maxWidth: '100%', marginBottom: 2, }}>
    <CardContent sx={{ paddingBottom: 0, }}>
      <a href={url} target="_blank">
      <Typography  gutterBottom variant="h5" component="div">
        {description}
      </Typography>
      </a>
    </CardContent>
    <CardActions sx={{ marginTop: 0, }}>
      <Button onClick={onVote} size="small">Upvote</Button>
      <div onClick={handleOpen} className={styles.upvotes_container}>
					<div className={styles.upvotes}>
						{visibleVotes.map(vote => (
							<p key={vote.id} className={styles.upvotes_item}>
								{ vote?.user?.name[0]?.toUpperCase() }
							</p>
						))}
					</div>
					<p className={styles.upvotes_text}>
						{votes.length > 3
							? `${votes.length-3} more upvote${votes.length-3 > 1 ? 's': ''}`
							: votes.length ? '' : ' No upvotes '}
					</p>
				</div>
        <VotesForm open={open} handleClose={handleClose} />
    </CardActions>
  </Card>
);
}

const Posts = () => {

const [fullyLoaded, setFullyLoaded] = useState(false);
const {error, data, fetchMore, networkStatus, variables } = useQuery(PAGINATE, {
  notifyOnNetworkStatusChange: true, 
  variables: {
  skip: 0,
  take: 40
}});

if (networkStatus === NetworkStatus.loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>{error.message}</div>;
}


return (
  <>
  {data?.feed?.links?.map((data) => <Post {...data} key={data.id} />)}
  {networkStatus !== NetworkStatus.fetchMore &&
    data?.feed?.links?.length % variables.take === 0 &&
    !fullyLoaded && (
    <InView
      onChange={async (inView) => {
        if (inView) {
          const result = await fetchMore({
            variables: {
              skip: data.feed.links.length,
            }
          });
          setFullyLoaded(!result.data.feed.links.length);
          console.log("inview")
        }
      }}
    />
  )}
  </>
)
}

export default Posts;