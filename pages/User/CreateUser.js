<form onSubmit={submitData} className="mt-3">
        <div className="row mb-4">
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="form6Example1">
                Name
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                name="fatherName"
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="form6Example2">
                Father Name
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                name="mobile"
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="form6Example1">
                Phone No:
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                name="nid"
                className="form-control"
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="form6Example2">
                NID
              </label>
            </div>
          </div>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            name="dueMonth"
            className="form-control"
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="form6Example4">
            Due Month
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="number"
            className="form-control" /*onChange={handleChange} */
          />
          <label className="form-label" htmlFor="form6Example6">
            Home Id
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="number"
            className="form-control" /*onChange={handleChange} */
          />
          <label className="form-label" htmlFor="form6Example6">
            Shop Id
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Place order
        </button>
      </form>