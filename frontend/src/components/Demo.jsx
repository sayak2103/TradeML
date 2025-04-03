import { px } from 'framer-motion';
import demoVideo from '../../video/TradeMLspd3.mp4';

function Demo()  {
    return(
        <div>
            <video src={demoVideo} height={"80%"} width={"80%"} autoPlay={true} ></video>
        </div>
    )
}

export default Demo;