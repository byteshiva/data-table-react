import React from 'react'
import './dashboard.css'

import {
  Link,
} from 'react-router-dom';

const Dashboard = () => {
  return (
    <>

    <ul class="navigation">
        <li><Link to="/public">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/contact">Contact</Link></li>
    </ul>


    <div class="wrapper">
    <header class="header">Header</header>
    <article class="main">
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>  
    </article>
    <aside class="aside aside-1">Aside 1</aside>
    <aside class="aside aside-2">Aside 2</aside>
    <footer class="footer">Footer</footer>
    </div>
      {/* <section>
          <div	class="column">First</div>
          <div	class="column">Second</div>
          <div	class="column">
              The	third	column,	with	more	content	than
              before!
          </div>
      </section> */}

      <ol	class="numbers">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
      </ol>

      <section>
          <div	class="column">First</div>
          <div	class="column">Second</div>
          <div	class="column">Third</div>
      </section>
      <section>
          <div	class="column">First</div>
          <div	class="column">Second</div>
          <div	class="column">Third</div>
          <div	class="column">Fourth</div>
      </section>
      <div	class="month">
        <div	class="week">
            <div	class="day"></div>
            <div	class="day"></div>
            <div	class="day"></div>
            <div	class="day">1</div>
            <div	class="day">2</div>
            <div	class="day">3</div>
            <div	class="day">4</div>
        </div>

        <div	class="week">
            <div	class="day">5</div>
            <div	class="day">6</div>
            <div	class="day">7</div>
            <div	class="day">8</div>
            <div	class="day">9</div>
            <div	class="day">10</div>
            <div	class="day">11</div>
        </div>
        <div	class="week">
            <div	class="day">12</div>
            <div	class="day">13</div>
            <div	class="day">14</div>
            <div	class="day">15</div>
            <div	class="day">16</div>
            <div	class="day">17</div>
            <div	class="day">18</div>
        </div>
        <div	class="week">
            <div	class="day">19</div>
            <div	class="day">20</div>
            <div	class="day">21</div>
            <div	class="day">22</div>
            <div	class="day">23</div>
            <div	class="day">24</div>
            <div	class="day">25</div>
        </div>

        <div	class="week">
            <div	class="day">26</div>
            <div	class="day">27</div>
            <div	class="day">28</div>
            <div	class="day">29</div>
            <div	class="day">30</div>
            <div	class="day">31</div>
            <div	class="day"></div>
        </div>
    </div>


      <div className="support">Dashboard</div>
    </>

  )
}

export default Dashboard
