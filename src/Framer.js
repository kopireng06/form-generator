import { AnimateSharedLayout, motion } from "framer-motion";
import { useEffect,useState } from "react";

const Framer = () => {
    const [coba,setCoba] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{
            setCoba(!coba)
        },1000)
    })

    return ( 
        <AnimateSharedLayout>           
            {!coba ? <motion.div layoutId="1">keong</motion.div> : null}
            <div className="bg-yellow p-5">
                {coba ? <motion.div layoutId="1">keong</motion.div> : null}
            </div>
        </AnimateSharedLayout>
    );
}
 
export default Framer;