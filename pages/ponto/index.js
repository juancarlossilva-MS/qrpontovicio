import React from 'react';
import { withIronSession } from "next-iron-session";
import { Button,Grid, Typography} from '@material-ui/core';
import {Print, MobileFriendly, Check} from '@material-ui/icons';
import  Link from 'next/link';
import Header from "../components/Header";

import Script from 'next/script'


const PrivatePage = ({ user }) => {

  const style = {
    txtD:{
      textDecoration:'none',
      color: '#ff007f'
    }
  };

  let scanner

  const onReadyFunc = () =>{
    console.log('huuuum... é mesmo?');

      scanner = new Instascan.Scanner(
          {
              video: document.getElementById('preview'),mirror: false
          }
      );
      scanner.addListener('scan', function(content) {
          //alert('Escaneou o conteudo: ' + content);
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position)=>{
                  
                  document.getElementById('resposta').innerHTML  = content+"<br>Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude;
              });
              
            } else { 
              document.getElementById('resposta').innerHTML = "Geolocation is not supported by this browser.";
            }
          
          //window.open(content, "_blank");
      });
      Instascan.Camera.getCameras().then(cameras => 
      {
          if(cameras.length > 0){
              scanner.start(cameras[0]);
          } else {
              alert("Não existe câmera no dispositivo!");
          }
      });
  }

  const inverterCamera = () =>{
     console.log('inverter camera');
     Instascan.Camera.getCameras().then(cameras => 
      {
          if(cameras.length > 0){
              scanner.stop(cameras[0]);
              scanner.start(cameras[1]);
          } else {
              alert("Não existe câmera no dispositivo!");
          }
      });
  }


    return(
   

  <div>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>

     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>

<Header/>
<div >
          <Grid container spacing={3}> 
          <video id="preview" style={{width:"100%"}} />
          <p id="resposta">teeesteee</p>

          <Button style={{backgroundColor:"black",color:"#ff007f"}} onClick={inverterCamera}>Inverter Camera</Button>

                <Script src="https://rawgit.com/schmich/instascan-builds/master/instascan.min.js"  onLoad={onReadyFunc} />
             
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