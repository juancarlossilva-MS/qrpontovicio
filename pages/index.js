import React from 'react';
import { withIronSession } from "next-iron-session";
import { Button,Grid, Typography} from '@material-ui/core';
import {Print, MobileFriendly, Check} from '@material-ui/icons';
import  Link from 'next/link';
import Header from "./components/Header";

const PrivatePage = ({ user }) => {

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

              <Grid item xs={12} ></Grid>
              <Grid item xs={12} ></Grid>
              <Grid item xs={1} sm={1}></Grid>
             
              <Grid item xs={5} sm={5}>
                <Link href="/ponto">
                 
                  <Button variant="contained" color="primary" style={{marginLeft:"4vw",color: '#ff007f',
      backgroundColor: 'black'}}>
                       <Check style={{fontSize:"8vw"}}/>
                  </Button>
                </Link>
                <Link href="/ponto" style={style.txtD}>
                  <Typography align="left" color="primary" variant="h4" component="h2"  style={{color: '#ff007f'}}>
                      Registrar Ponto
                    </Typography>
                  </Link>
                 
              </Grid>
              <Grid item xs={5} sm={5}>
                  
                <Link href="/registrados" style={style.txtD}>
                  <Button   style={{marginLeft:"4vw",color: '#ff007f',
      backgroundColor: 'black'}} variant="contained" color="primary">
                       <MobileFriendly style={{fontSize:"8vw"}}/>
                  </Button>
                </Link>
                <Link href="/registrados" style={style.txtD}>
                    <Typography align="left" color="primary" variant="h4" component="h2" style={{color: '#ff007f'}}>
                        Pontos registrados
                      </Typography> 
                
                  </Link>
              </Grid>

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