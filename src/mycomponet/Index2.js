import React from 'react'
import { Route, Routes, Link , } from "react-router-dom"
import {Login} from './Login';

export default function Index2() {
   

  return (
    <><nav>
          <div class="menu-icon">
          </div>
          <div class="logo">🅾🅽🅻🅸🅽🅴 🅻🅸🅱🆁🅰🆁🆈 | 🅱🅾🅾🅺🆂🆃🅾🆁🅴</div>
          <div class="buttons">
          </div>
      </nav><div class="background">
              <div class="page1">
                  <h1 class="hp-text1"></h1>
              </div>
              <div id="log-in">
                  <h1 class="heading">Join us to have access to books</h1>
                  <div class="input-data">
                  <Link to="/Signup">
                          <input type="submit" name="log_in" value="Register" />
                      </Link>
                      <Link to="/login">
                          <input type="submit" name="admin" value="Login" />
                      </Link>
                      
                      
                  </div>
              </div>
          </div></>
   
  )
}
