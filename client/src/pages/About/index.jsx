import React from "react";
import {ContentBox} from "../../components/ui/ContentBox";
import * as SC from "./styles"

export const About = () => {
    return (
        <ContentBox>
            <SC.AboutText>
                Tabata Timer is a convenient online tool for conducting workouts using the Tabata interval training method. With this timer, you can easily create personalized workout programs and keep track of rest and preparation times between exercises.
                <br/>
                <br/>
                The Tabata method is an effective way to improve physical fitness and increase endurance. It involves performing exercises for short periods of time at high intensity with breaks in between.
                <br/>
                <br/>
                Tabata timer provides the ability to set individual work and rest intervals, as well as adjust the number of cycles and overall workout duration. This allows you to create workouts that are perfectly suited to your individual needs and goals.
                <br/>
                <br/>
                Whether you're a beginner or an experienced athlete, Tabata Timer is a great way to challenge yourself and take your workouts to the next level. With its intuitive interface and customizable settings, our timer makes it easy to create dynamic and effective workouts that will help you achieve your fitness goals.
                <br/>
                <br/>
                Use Tabata Timer for your workouts, improve your form, and achieve new athletic achievements.
            </SC.AboutText>
        </ContentBox>
    )
}