import CommonMixins from "@/mixins/common-mixins";
  const id = 1
  const obj = {
    $route : {
      params:{
        id
      }
    },
    $router:{
      push: jest.fn(),
      go: jest.fn()
    }
  }

describe("CommonMixins", () => {
    it("id computed", () => {
      const mixins = CommonMixins.computed.id.bind(obj)
      expect(mixins()).toBe(id)
    });

    it("currentDateTime computed", () => {
      const mixins = CommonMixins.computed.currentDateTime
      expect(typeof mixins()).toEqual("string")
    });

    it("maxDateOfBirth computed", () => {
      const mixins = CommonMixins.computed.maxDateOfBirth
      expect(mixins()).toBe(new Date(2000,0,1).toISOString())
    });

    it("minDateOfBirth computed", () => {
      const mixins = CommonMixins.computed.minDateOfBirth
      expect(mixins()).toBe(new Date(1979,1,1).toISOString())
    });

    it("moveTo method", () => {
      const mixins = CommonMixins.methods.moveTo.bind(obj)
      const spy = jest.spyOn(obj.$router,"push")
      mixins()
      expect(spy).toHaveBeenCalled();
    });

    it("moveToWithParamsRouteId method", () => {
      const mixins = CommonMixins.methods.moveToWithParamsRouteId.bind(obj)
      const spy = jest.spyOn(obj.$router,"push")
      mixins()
      expect(spy).toHaveBeenCalled();
    });

    it("moveToWithParams method", () => {
      const mixins = CommonMixins.methods.moveToWithParams.bind(obj)
      const spy = jest.spyOn(obj.$router,"push")
      mixins()
      expect(spy).toHaveBeenCalled();
    });

    it("moveToPreviousPage method", () => {
      const mixins = CommonMixins.methods.moveToPreviousPage.bind(obj)
      const spy = jest.spyOn(obj.$router,"go")
      mixins()
      expect(spy).toHaveBeenCalled();
    });

  });
  