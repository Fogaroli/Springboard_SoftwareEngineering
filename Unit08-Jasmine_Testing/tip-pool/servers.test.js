describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  //test is the server name created in the function before each is detected and added to the servers table.
  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server1'].serverName).toEqual('Alice');
  });

  //test if the update server table successfully add content to the HTML page.
  it("should update the server table html content on updateServertable()",function(){
    let serverName = "Alice";
    allServers["server1"] = {serverName};
    updateServerTable();

    expect(serverTbody.innerHTML).not.toEqual("");
    expect(document.querySelector("#server1").innerHTML).toEqual("<td>Alice</td><td>$0.00</td><td><button>X</button></td>");

  });


  //test if the action triggred by the remove button removes a server from the table
  it('should update the server table removing the target element and adjust earings for all servers', function(){
    let serverName = "Alice";
    allServers["server1"] = {serverName};
    updateServerTable();
    const evt = {target: document.querySelector("#server1 td button")};
    removeServer(evt);

    expect(allServers.server1).toBe(undefined);
    expect(document.querySelector("#server1")).toBe(null);
    
  });


  afterEach(function() {
    allServers = {};
    updateServerTable();
    serverNameInput.value = '';
    serverId = 0;
  });
});
