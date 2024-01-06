import React from 'react';
import { withIronSession } from "next-iron-session";
import { Button,Grid, Typography} from '@material-ui/core';
import {Print, MobileFriendly, Check} from '@material-ui/icons';
import  Link from 'next/link';
import Header from "../components/Header";


import dynamic from 'next/dynamic';

const QRScanner = dynamic(
    () => import("../components/QRScanner"),
    {
      ssr: false,
    }
  );

const PrivatePage = ({ user }) => {
    if (typeof window === 'undefined') {
        console.log('é nao temos window');
        global.window = {}
      }

  const style = {
    txtD:{
      textDecoration:'none',
      color: '#ff007f'
    }
  };


    return(
   

  <div>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>

     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>

<Header/>
<div >
          <Grid container spacing={3}> 

             <QRScanner/>
           
          </Grid>
</div>


  </div>);
};



export const getServerSideProps = withIronSession(

  
  async ({ req, res }) => {
    const user = req.session.get("user");
    if (!user) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    return {
      props: { user }
    };
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
  }
);

export default PrivatePage;