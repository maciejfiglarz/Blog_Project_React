import React from 'react'

import {connect} from 'react-redux'
import {fabric} from 'fabric';
// import {Canvas, Circle, Image, Path, Text} from 'react-fabricjs';

import {useForm} from "../../hooks/useForm";

const Simulator = () => {
    const [values, handleChange] = useForm({email: "", password: ""});
    return (
        <div>
            <input name="email" value={values.email} onChange={handleChange}/>
            <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
            />

            {/* <Canvas
                ref="canvas"
                width="700"
                height="700"
                style="outline:2px solid red;"
                id="simulator">
                <Text
                    text="Click me"
                    left={0}
                    top={200}
                    shadow="rgba(0,0,0,0.3) 5px 5px 5px"
                    stroke="#ff1318"
                    strokeWidth={1}
                    fontStyle="italic"
                    fontFamily="Hoefler Text"
                />

                <Image
                    src="http://i.imgur.com/jZsNUCi.jpg"
                    width={300}
                    height={300}
                    left={0}
                    top={500}
                /> */}

                {/*<Circle*/}
                {/*    ref="circle"*/}
                {/*    radius={20}*/}
                {/*    left={100}*/}
                {/*    top={50}*/}
                {/*    stroke="green"*/}
                {/*/>*/}

                {/*<Image*/}
                {/*    ref="image"*/}
                {/*    imgElement={document.getElementById('my-image')}*/}
                {/*    width={100}*/}
                {/*    height={100}*/}
                {/*/>*/}


                {/*<Path*/}
                {/*    path="M 0 0 L 300 100 L 200 300 z"*/}
                {/*    fill="red"*/}
                {/*    stroke="green"*/}
                {/*    strokeWidth={10}*/}
                {/*    opacity={0.5}*/}
                {/*/>*/}

            {/* </Canvas> */}
        </div>
    );
};
export default Simulator;
// const mapStateToProps = (state) => {
//     return {user: state.user};
// };
//
// export default connect(mapStateToProps)(Simulator);