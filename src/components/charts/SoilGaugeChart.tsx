import React from 'react'
import GaugeComponent from 'react-gauge-component'

type Props = {}

const SoilGaugeChart = (props: Props) => {

    const valueToDry = (value:number) => {
        
       
          return  'Dry';
        
      }

      const valueToWet = (value:number) => {
       
        return  'Wet';
      
    }
    return (
        <GaugeComponent
            value={50}
            style={{width:400, height:300}}
            type="radial"
            labels={{
                valueLabel: {
                    style: {
                      fontSize: "35px", fill: "#464646", fontFamily: 'Poppins',
                    }
        
                  },
                tickLabels: {
                    defaultTickValueConfig:{
                        style: {
                            fontSize: ".9em", fill: "#464646", fontFamily: 'Poppins',
                          }

                    },
                    type: "outer",
                    ticks: [
                        { value: 0, valueConfig: { formatTextValue: valueToDry} },
                        { value: 20 },
                        { value: 40 },
                        { value: 60 },
                        { value: 80 },
                        { value: 100, valueConfig: { formatTextValue: valueToWet} },
                      
                    ],
                    
                }
            }}
            arc={{
                colorArray: ['#ff0707', '#ff7907', '#fffc0a', '#8fdaef', '#1480c1'],
                subArcs: [{ limit: 20 }, { limit: 40 }, { limit: 60 }, { limit: 80 }, { limit: 100 }],
                padding: 0.02,
                width: 1
            }}
            pointer={{
                type: "needle",
                elastic: true,
                animationDelay: 0
            }}
        />
    )
}

export default SoilGaugeChart