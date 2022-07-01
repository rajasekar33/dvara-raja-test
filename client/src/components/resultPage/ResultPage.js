import React from 'react';

const ResultPage = (props) => {

    return (
        <div>
            <ul className='removeULStyle'>
                {props.results.map(res => {
                    return (
                        <li className='userCard'>
                            <div className='cardInner'>
                                <div>
                                    <img width='100px' src={res.picture} alt='profile' />
                                </div>
                                <div>
                                    <h2>{res.name}</h2>
                                    <p>{res.number}</p>
                                    <p style={{fontSize: "13px"}}>Created At: {res.createdAt}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ResultPage