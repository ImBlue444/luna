import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl rounded-lg">Luna</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 rounded-lg">
          <li>
            <a className="rounded-lg">Link</a>
          </li>
          <li>
            <details>
              <summary className="rounded-lg">Parent</summary>
              <ul className="p-2 bg-base-100 rounded-lg">
                <li className="rounded-lg">
                  <a>Link 1</a>
                </li>
                <li className="rounded-lg">
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div >
  );
};

export default Navbar;
