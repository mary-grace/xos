"use strict";angular.module("xos.serviceGrid",["ngResource","ngCookies","ui.router","xos.helpers"]).config(["$stateProvider",function(e){e.state("serviceGrid",{url:"/",template:"<service-grid></service-grid>"}).state("serviceGraph",{url:"/graph",template:"<service-graph></service-graph>"})}]).config(["$httpProvider",function(e){e.interceptors.push("NoHyperlinks")}]).directive("serviceGrid",function(){return{restrict:"E",scope:{},bindToController:!0,controllerAs:"vm",templateUrl:"templates/service-grid.tpl.html",controller:["Services","_",function(e,t){var n=this;this.tableConfig={columns:[{label:"Status",prop:"status",type:"boolean"},{label:"Name",prop:"name",link:function(e){return""+e.view_url.replace(/\$[a-z]+\$/,e.id)}},{label:"Kind",prop:"kind"},{label:"Enabled",prop:"enabled",type:"boolean"}],filter:"field",order:!0},e.query().$promise.then(function(e){n.services=t.map(e,function(e){return e.status=0!==parseInt(e.backend_status.match(/^[0-9]/)[0]),e})})["catch"](function(e){throw new Error(e)})}]}}),angular.module("xos.serviceGrid").run(["$templateCache",function(e){e.put("templates/service-graph.tpl.html",'<div class="row">\n  <div class="col-sm-10">\n    <h1>Graph</h1>\n    <ul>\n      <li>Use D3 to create a service chart based on coarse services?</li>\n    </ul>\n  </div>\n  <div class="col-sm-2">\n    <a href="/admin/core/service/add" class="btn btn-success btn-block">\n      <i class="glyphicon glyphicon-plus"></i>\n      Add Service\n    </a>\n    <a href="#/" class="btn btn-default btn-block">\n      Service List\n    </a>\n  </div>\n</div>'),e.put("templates/service-grid.tpl.html",'<div class="row">\n  <div class="col-sm-10">\n    <xos-table config="vm.tableConfig" data="vm.services"></xos-table>\n  </div>\n  <div class="col-sm-2">\n    <a href="/admin/core/service/add" class="btn btn-success btn-block">\n      <i class="glyphicon glyphicon-plus"></i>\n      Add Service\n    </a>\n    <!-- <a href="#/graph" class="btn btn-default btn-block">\n      Tenancy Graph\n    </a> -->\n  </div>\n</div>')}]),function(){angular.module("xos.serviceGrid").directive("serviceGraph",function(){return{restrict:"E",scope:{},bindToController:!0,controllerAs:"vm",templateUrl:"templates/service-graph.tpl.html",controller:["$element","GraphService",function(e,t){var n=void 0,r=e[0],i=void 0,s=void 0,c=function(e){i.attr({transform:function(e){return"translate("+e.x+", "+e.y+")"}}),s.attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y})};t.loadCoarseData().then(function(e){e.tenants=e.tenants.map(function(e){return{source:e.provider_service,target:e.subscriber_service}}),e.services.push({name:"XOS","class":"xos",x:r.clientWidth/2,y:r.clientHeight/2,fixed:!0}),a(r);var t=d3.layout.force().nodes(e.services).links(e.tenants).charge(-1060).gravity(.1).linkDistance(200).size([r.clientWidth,r.clientHeight]).on("tick",c).start();s=n.selectAll(".link").data(e.tenants).enter().insert("line").attr("class","link"),i=n.selectAll(".node").data(e.services).enter().append("g").call(t.drag).on("mousedown",function(){d3.event.stopPropagation()}),i.append("circle").attr({"class":function(e){return"node "+(e["class"]||"")},r:10}),i.append("text").attr({"text-anchor":"middle"}).text(function(e){return e.name}),i.select("circle").attr({r:function(e){var t=d3.select(this).node().parentNode,n=d3.select(t).select("text").node().getBBox();return n.width/2+10}})});var a=function(e){d3.select(e).select("svg").remove(),n=d3.select(e).append("svg").style("width",e.clientWidth+"px").style("height",e.clientHeight+"px")}}]}})}(),angular.module("xos.serviceGrid").run(["$location",function(e){e.path("/")}]);