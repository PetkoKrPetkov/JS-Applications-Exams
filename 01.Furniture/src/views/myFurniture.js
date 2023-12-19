import{html, render} from '../../node_modules/lit-html/lit-html.js';
import { get } from '../api.js';
import { userData } from '../userDataHelper.js';
const root = document.querySelector('.container');

const furnitureTemp = (data) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div class="row space-top">
            ${data.map(item => cardTemp(item))}
        </div>
`
const cardTemp = (item) => html`
  <div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src=${item.img} />
        <p>${item.description}</p>
        <footer>
          <p>Price: <span>${item.price} $</span></p>
        </footer>
        <div>
          <a href="/details/${item._id}" class="btn btn-info">Details</a>
        </div>
      </div>
    </div>
  </div>
`;

export async function myFurnitureView() {
    const userID = userData.getUserId();
    const data = await get(`data/catalog?where=_ownerId%3D%22${userID}%22`)
    render(furnitureTemp(data), root);
}