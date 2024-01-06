import { Cameras, Scanner } from "react-instascan";

const QRScanner = () => {
    const onScan = res => console.log(res);
    return (
      <>
       <Cameras>
        {cameras => (
            <div>
            <h1>Scan the code!</h1>
            <Scanner camera={cameras[0]} onScan={onScan}>
                <video style={{ width: 400, height: 400 }} />
            </Scanner>
            </div>
        )}
        </Cameras>
      </>
    );
  };
  
  export default QRScanner;