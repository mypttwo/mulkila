import React from 'react';

let afterBidModal = (props) => {
    return (
        <div className="modal fade text-mono" id="afterBidModalCenter" tabIndex="-1" role="dialog" aria-labelledby="afterBidModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content text-center">
                    <div className="modal-body text-mono">
                        <img src='favicon.ico' className="rounded mx-auto d-block mt-3" alt="Makhno" />
                        <p className="text-mono mt-3">Check your Metamask window and confirm the transaction to place the bid. </p>
                        <button type="button" className="btn btn-dark btn-shadow my-2 ml-0 text-left mr-1" data-dismiss="modal">I understand</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default afterBidModal;