import React from "react";

export default function Footer() {
  return (
    <>
      <nav className="bg-white border-t fixed bottom-0 flex  justify-evenly gap-5 left-0 right-0  text-center">
        <div className="p-4 text-2xl">
          Made By : <a href="https://www.linkedin.com/in/ahmedashraf-3b-25371525b/" className="text-emerald-600">ahmed ashraf</a>
        </div>
        <div className="flex items-center justify-center">
        <i class="fa-brands fa-facebook text-2xl hover:text-emerald-500 transition m-2"></i>
        <i class="fa-brands fa-youtube text-2xl hover:text-emerald-500 transition m-2"></i>
        <i class="fa-brands fa-linkedin text-2xl hover:text-emerald-500 transition m-2"></i>
        </div>
      </nav>
    </>
  );
}
