import PrimarySearchAppBar from '../components/AppBar/AppBar';
import Posts from '../components/Posts/Posts'
import * as React from 'react';


export default function Home() {

  return (
    <div>
      <PrimarySearchAppBar/>
      <Posts />
    </div>
      
  )
}
