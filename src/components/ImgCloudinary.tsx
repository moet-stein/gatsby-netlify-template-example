import React from "react"
interface Props {
    src: string;
    title: string;
    quality: number;
    width: number;
    className?: any;
    style?: object;
}

const ImgCloudinary = (props: Props) => {
    const qualityTransfomation = props.src.replace('q_100,w_2400', `q_${props.quality},w_${props.width}`) || ""

    return (
        <img width={props.width} height="auto" src={qualityTransfomation} style={props.style} className={props.className} alt={props.title} />
    )
}

export default ImgCloudinary
