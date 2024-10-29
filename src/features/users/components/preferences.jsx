import React from 'react'
import CardPref from './card-preference';

export default function Preferences( {text, svgIcons, cols } ) {
    return (
        <section className='flex flex-col mt-10'>
            <div>
                <h1 className='mx-32 font-display text-display-sm text-secondary-sec1 text-gradient'>{text}</h1>
            </div>
            <div className={`grid ${cols} gap-6 mx-36 mt-14`} >
                {
                    svgIcons.map(([text,icon], index) => (
                        //<div  key={index} className="flex ">    
                            <CardPref text={text} SvgIcon={icon}/>
                        //</div>
                    ))
                }
            </div>
        </section>
    )
}
