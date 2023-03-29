import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';


function BankTransfer() {
    const [bankDetail, setBankDetail] = useState({});
    const [isNext, setNext] = useState(false);

      
    const changeInput = e => {
        const target = e.target;

        setBankDetail(s => ({
            ...s,
            [target.name]: [target.value]
        }));
    }

    const proceed = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        console.log(formData);
        setNext(true);
    }

    
    return (
        <div className="row mx-0 justify-content-center mt-5 text-center g-3">
            <div className="col-12 col-md-8 border p-4">
            {
                isNext     
                        ? <Transfer next={proceed} bankDetail={bankDetail} changeInput={changeInput} setNext={setNext} />
                        : <Bank next={proceed} bankDetail={bankDetail} changeInput={changeInput} />
            }
            </div>
        </div>
    );
}

function Bank({next, bankDetail, changeInput}) {

    return (<>
        <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#Same" type="button" role="tab" aria-controls="Same" aria-selected="true">Same</button>
        </li>
        <li className="nav-item" role="presentation">
            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#Other" type="button" role="tab" aria-controls="Other" aria-selected="false">Other</button>
        </li>
    </ul>

        <div className="tab-content">
            <div className="tab-pane fade show active p-2" id="Same" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                <form onSubmit={next}>
                    <input name="bankName" value="name of bank" required type="hidden" className="form-control form-control-lg mb-3 rounded-0" />
                    <div className="mb-3">
                        <input value={bankDetail?.accountNumber ?? '' } onInput={changeInput} name="accountNumber" required type="tel" maxLength="10" className="form-control form-control-lg mb-1 rounded-0" placeholder="Beneficiary Account Number" />
                        <div className="d-flex justify-content-end">
                            <span>Beneficiary Name</span>
                        </div>
                    </div>
                    
                    <input value={bankDetail?.amount ?? '' } onInput={changeInput} name="amount" required type="number" className="form-control form-control-lg mb-3 rounded-0" placeholder="Amount" />
                    
                    <input value={bankDetail?.description ?? '' } onInput={changeInput} name="description" required type="text" className="form-control form-control-lg mb-3 rounded-0" placeholder="Description" />

                    <button className="btn btn-warning w-100 text-light fw-bold py-2 rounded-0">PROCEED</button>
                </form>
            </div>

            <div className="tab-pane fade p-2" id="Other" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                <form onSubmit={next}>
                    <select value={bankDetail?.bankName ?? '' } onChange={changeInput} name="bankName" className="form-select form-select-lg mb-3 rounded-0" aria-label="Banks" required>
                        <option value="">Banks</option>
                        <option value="Alat">Alat</option>
                        <option value="Access Bank">Access Bank</option>
                        <option value="GTBank">GTBank</option>
                    </select>

                    <div className="mb-3">
                        <input value={bankDetail?.accountNumber ?? '' } onInput={changeInput} name="accountNumber" required type="tel" maxLength="10" className="form-control form-control-lg mb-1 rounded-0" placeholder="Beneficiary Account Number" />
                        <div className="d-flex justify-content-end">
                            <span>Beneficiary Name</span>
                        </div>
                    </div>
                    
                    <input value={bankDetail?.amount ?? '' } onInput={changeInput} name="amount" required type="number" className="form-control form-control-lg mb-3 rounded-0" placeholder="Amount" />
                    
                    <input value={bankDetail?.description ?? '' } onInput={changeInput} name="description" required type="text" className="form-control form-control-lg mb-3 rounded-0" placeholder="Description" />

                    <button className="btn btn-warning w-100 text-light fw-bold py-2 rounded-0">PROCEED</button>
                </form>
            </div>
        </div>
    </>)
}

function Transfer({next, bankDetail, changeInput, setNext}) {
    return <>
        <form onSubmit={next}>
            <div className="d-flex justify-content-start mb-4">
                <i className="bi bi-arrow-left-circle fs-3" title="back" onClick={e => setNext(s => !s)}></i>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control rounded-0" id="act-number" defaultValue={bankDetail?.accountNumber} disabled />
                <label htmlFor="act-number">Beneficiary Account Number</label>
            </div>

            <div className="form-floating mb-3">
                <input type="text" className="form-control rounded-0" id="act-number" value="Account Name" disabled />
                <label htmlFor="act-number">Beneficiary Name</label>
            </div>
            
            <input value={bankDetail?.pin ?? '' } onInput={changeInput} name="pin" required type="number" className="form-control form-control-lg mb-3 rounded-0" placeholder="PIN" />
            
            <button className="btn btn-warning w-100 text-light fw-bold py-2 rounded-0">SEND</button>
        </form>
    </>
}

export default BankTransfer;

if (document.getElementById('bank-app')) {
    const Index = ReactDOM.createRoot(document.getElementById("bank-app"));

    Index.render(
        <React.StrictMode>
            <BankTransfer/>
        </React.StrictMode>
    )
}
