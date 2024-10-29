import React from 'react'
import CardPref from './card-preference';

export default function Preferences( {text, svgIcons } ) {
    return (
        <section className='flex flex-col mt-10'>
            <div>
                <h1 className='mx-32 font-display text-display-sm text-secondary-sec1 text-gradient'>{text}</h1>
            </div>
            <div className={`flex flex-wrap gap-6 mx-36 mt-10 mr-[350px]`} >
                {
                    svgIcons.map(([text,icon], index) => (
                        <div key={index} className=" mr-11">    
                            <CardPref text={text} SvgIcon={icon}/>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
