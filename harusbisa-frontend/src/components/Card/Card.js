import React from "react";
import { Card, CardContent } from "@material-ui/core";

function FunctionalCard(props){
    return(
        <Card>
            <CardContent style={props.styles.content}>
                <h3><a href={props.content.link}>{props.content.title}</a></h3>
            </CardContent>
        </Card>
    )
}

export function ProfCourseCard(props){
    const styles={
        content: {background:"pink"}
    }
    return(<FunctionalCard content={props.content} styles={styles}/>)
}

export default ProfCourseCard;