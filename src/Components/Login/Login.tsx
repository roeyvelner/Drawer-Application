import React from 'react';



export default ()=>{
    return(
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="email-input">Email</label>
                    <input className="form-control" type="email" name="email" id="email-input"/>
                </div>

                <div className="form-group">
                    <label htmlFor="password-input">Password</label>
                    <input className="form-control" type="password" name="password" id="password-input"/>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary" type="submit" >Submit</button>
                </div>
            </form>
        </div>
    )
}