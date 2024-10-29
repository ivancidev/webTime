import React from 'react'
import CardPref from './card-preference';
import frontendIcon from '../../../icons/frontend';
import BackendIcon from '../../../icons/backend'
import DesarrolloFullStackIcon from '../../../icons/desarrolloFullStack';
import DevOpsIcon from '../../../icons/devOps';
import MejoresPraticasIcon from '../../../icons/mejoresPraticas';
import UIUXicon from '../../../icons/UIUX';
export default function Category() {
 
    return (
        <section className='flex flex-col'>
            <div>
                <h1 className='mx-32 font-display text-display-sm text-secondary-sec1 text-gradient'>Elige las categorias de tu interes</h1>
            </div>
            <div className="grid grid-rows gap-10 mx-36 mt-14 " >

                <div className='flex space-x-20'>

                        <CardPref text="front-end" SvgIcon={frontendIcon}/>
                
                        <CardPref text="Back-end" SvgIcon={BackendIcon}/>
      
                        <CardPref className="" text="Desarrollo Full-stack" SvgIcon={DesarrolloFullStackIcon}/>
       
                        <CardPref text="Lenguajes de programación" SvgIcon={DesarrolloFullStackIcon}/>
              
                </div>

                <div className='flex space-x-20'>
             
                        <CardPref text="DevOps" SvgIcon={DevOpsIcon}/>
                   
                        <CardPref text="Mejores practicas" SvgIcon={MejoresPraticasIcon}/>
                    
                        <CardPref text="UI/UX" SvgIcon={UIUXicon}/>
                
                </div>
           
            </div>
        </section>
    )
}
