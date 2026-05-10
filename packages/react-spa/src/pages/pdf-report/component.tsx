import {
  Document,
  Font,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
  type Styles,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import React from "react";

// 注意：react-pdf 默认不支持中文字体，必须注册中文字体才能正常显示中文。
// 这里使用一个可用的思源黑体 TTF 字体链接作为示例。在生产环境中建议将字体文件放到 public 目录并使用本地路径。
Font.register({
  family: "NotoSansSC",
  src: "https://cdn.jsdelivr.net/gh/StellarCN/scp_zh@master/fonts/SimHei.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: "14mm",

    fontFamily: "NotoSansSC",
    fontSize: 10,
    textAlign: "center",
  },

  flexRow: {
    flexDirection: "row",
  },
  flexCol: {
    flexDirection: "column",
  },
  flex1: {
    flex: 1,
  },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  itemsCenter: {
    alignItems: "center",
  },
  gap10: {
    gap: 10,
  },
  gap12: {
    gap: 12,
  },

  width20: {
    width: "20%",
  },
  width40: {
    width: "40%",
  },
  width80: {
    width: "80%",
  },

  padding2: {
    padding: 2,
  },
  padding4: {
    padding: 4,
  },
  padding6: {
    padding: 6,
  },
  padding8: {
    padding: 8,
  },
  paddingY2: {
    paddingVertical: 2,
  },
  paddingY4: {
    paddingVertical: 4,
  },
  paddingY6: {
    paddingVertical: 6,
  },
  paddingY8: {
    paddingVertical: 8,
  },
  paddingT2: {
    paddingTop: 2,
  },
  paddingT4: {
    paddingTop: 4,
  },
  paddingT6: {
    paddingTop: 6,
  },
  paddingT8: {
    paddingTop: 8,
  },
  paddingB2: {
    paddingBottom: 2,
  },
  paddingB4: {
    paddingBottom: 4,
  },
  paddingB6: {
    paddingBottom: 6,
  },
  paddingB8: {
    paddingBottom: 8,
  },

  border: {
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  borderT: {
    borderTopWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  borderR: {
    borderRightWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  borderB: {
    borderBottomWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  borderL: {
    borderLeftWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  borderTR: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  borderBL: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },

  font10: {
    fontSize: 10,
  },
  font12: {
    fontSize: 12,
  },
  font16: {
    fontSize: 16,
  },
  fontBold: {
    fontWeight: "bold",
  },

  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },
  textLeft: {
    textAlign: "left",
  },
});

const of = (count: number) => {
  return Array.from({ length: count }, (_, index) => index + 1);
};

type Style = Styles[keyof Styles];
type CnItem = Style | false | undefined | null;

const cn = (...args: CnItem[]) => {
  return args.filter((i): i is Style => {
    if (typeof i !== "object") {
      return false;
    }

    if (i === null) {
      return false;
    }

    return true;
  });
};

const Row = (props: React.PropsWithChildren) => {
  return <View style={[styles.flexRow]}>{props.children}</View>;
};

interface ColProps {
  children?: React.ReactNode;
  width?: number | string;
}

const Col = (props: ColProps) => {
  const { width } = props;

  return (
    <View style={[width ? { width } : styles.flex1]}>{props.children}</View>
  );
};

interface CellProps {
  children?: React.ReactNode;
  tr?: boolean;
  bl?: boolean;
  t?: boolean;
  r?: boolean;
  b?: boolean;
  l?: boolean;
  font12?: boolean;
  height?: number;
}

const Cell = (props: CellProps) => {
  const { height = 18, tr = true, bl, t, r, b, l, font12 } = props;

  return (
    <View
      style={cn(
        styles.itemsCenter,
        styles.justifyCenter,
        tr && styles.borderTR,
        bl && styles.borderBL,
        t && styles.borderT,
        r && styles.borderR,
        b && styles.borderB,
        l && styles.borderL,
        font12 ? styles.font12 : styles.font10,
        { height },
      )}
    >
      <Text>{props.children}</Text>
    </View>
  );
};

const PageHeader = (props: React.PropsWithChildren) => {
  return (
    <View>
      <Text style={[styles.font12, styles.textRight]}>{props.children}</Text>
    </View>
  );
};

const PageFooter = (props: React.PropsWithChildren) => {
  return (
    <View style={[styles.paddingT8]}>
      <Text style={[styles.textRight, styles.font12]}>{props.children}</Text>
    </View>
  );
};

const ReportTitle = (props: React.PropsWithChildren) => {
  return (
    <View style={[styles.paddingY8]}>
      <Text style={[styles.font16, styles.fontBold]}>{props.children}</Text>
    </View>
  );
};

const TableHeader = () => (
  <View style={[styles.flexRow, styles.font12, styles.paddingB2]}>
    <View
      style={[
        styles.flex1,
        styles.flexRow,
        styles.itemsCenter,
        styles.justifyCenter,
        styles.gap12,
      ]}
    >
      <Text style={[styles.fontBold]}>单位名称</Text>
      <Text>江岸车辆段武南轮厂轮轴车间</Text>
    </View>
    <View
      style={[
        styles.flex1,
        styles.flexRow,
        styles.itemsCenter,
        styles.justifyCenter,
        styles.gap12,
      ]}
    >
      <Text style={[styles.fontBold]}>检验时间</Text>
      <Text>{dayjs().format("YYYY年MM月DD日 HH:mm:ss")}</Text>
    </View>
  </View>
);

const EquipmentTable = () => (
  <Row>
    <Col>
      <Cell l font12>
        设备型号
      </Cell>
    </Col>
    <Col>
      <Cell></Cell>
    </Col>
    <Col>
      <Cell font12>设备编号</Cell>
    </Col>
    <Col>
      <Cell font12>{null}</Cell>
    </Col>
    <Col>
      <Cell font12>实物试块型号</Cell>
    </Col>
    <Col>
      <Cell>
        <Text></Text>
      </Cell>
    </Col>
  </Row>
);

const LZInfoTable = () => {
  const BASIC_ROW_HEIGHT = { height: 18 };

  return (
    <>
      <Row>
        <Col>
          <Cell>左轮座探头晶片编号及灵敏度</Cell>
        </Col>
      </Row>
      <Row>
        <View style={[styles.width40]}>
          <Cell>通道编号</Cell>
        </View>
        <Col>
          <Cell>左外</Cell>
        </Col>
        <Col>
          <Cell>左内</Cell>
        </Col>
        <Col>
          <Cell>左A3</Cell>
        </Col>
      </Row>
      <Row>
        <View
          style={[
            styles.borderTR,
            styles.width40,
            styles.justifyCenter,
            styles.itemsCenter,
          ]}
        >
          <Text>折射角（度）</Text>
        </View>
        <View style={[styles.borderTR, styles.flex1, styles.padding4]}>
          <Text>51</Text>
        </View>
        <View style={[styles.borderTR, styles.flex1, styles.padding4]}>
          <Text>44</Text>
        </View>
        <View style={[styles.borderTR, styles.flex1, styles.padding4]}>
          <Text>22.5</Text>
        </View>
      </Row>
      <Row>
        <View style={[styles.flexRow, styles.width40]}>
          <View
            style={[
              styles.borderTR,
              styles.flex1,
              styles.justifyCenter,
              styles.itemsCenter,
            ]}
          >
            <Text>灵敏度{"\n"}（dB）</Text>
          </View>
          <View style={[styles.flex1]}>
            <View
              style={[
                styles.borderTR,
                styles.flex1,
                styles.justifyCenter,
                styles.itemsCenter,
                BASIC_ROW_HEIGHT,
              ]}
            >
              <Text>校验{"\n"}（80%）</Text>
            </View>
            <View
              style={[
                styles.borderTR,
                styles.flex1,
                styles.justifyCenter,
                styles.itemsCenter,
                BASIC_ROW_HEIGHT,
              ]}
            >
              <Text>补偿</Text>
            </View>
            <View
              style={[
                styles.borderTR,
                styles.flex1,
                styles.justifyCenter,
                styles.itemsCenter,
                BASIC_ROW_HEIGHT,
              ]}
            >
              <Text>探伤</Text>
            </View>
          </View>
        </View>
        <View style={[styles.flex1]}>
          <Row>
            <Col>
              <Cell></Cell>
            </Col>
            <Col>
              <Cell></Cell>
            </Col>
            <Col>
              <Cell></Cell>
            </Col>
          </Row>
          <Row>
            <Col>
              <Cell></Cell>
            </Col>
            <Col>
              <Cell></Cell>
            </Col>
            <Col>
              <Cell></Cell>
            </Col>
          </Row>
          <Row>
            <Col>
              <Cell></Cell>
            </Col>
            <Col>
              <Cell></Cell>
            </Col>
            <Col>
              <Cell></Cell>
            </Col>
          </Row>
        </View>
      </Row>
    </>
  );
};

const XHCTable = () => {
  const BASIC_ROW_HEIGHT = { height: 18 };
  const LG_ROW_HEIGHT = { height: 28 };

  return (
    <>
      <View style={[styles.flexRow]}>
        <View style={[styles.flexRow, styles.flex1]}>
          <View style={[styles.borderTR, styles.flex1]}>
            <Text>左</Text>
          </View>
          <View style={[styles.borderTR, styles.flex1]}>
            <Text>通道{"\n"}编号</Text>
          </View>
          <View style={[styles.borderTR, styles.flex1]}>
            <Text>拆射{"\n"}角度</Text>
          </View>
        </View>
        <View style={[styles.flex1]}>
          <View style={[styles.borderTR, BASIC_ROW_HEIGHT]}>
            <Text>灵敏度(dB)</Text>
          </View>
          <View style={[styles.flexRow]}>
            <View style={[styles.borderTR, styles.flex1, LG_ROW_HEIGHT]}>
              <Text>{"校验\n(80%)"}</Text>
            </View>
            <View style={[styles.borderTR, styles.flex1, LG_ROW_HEIGHT]}>
              <Text>补偿</Text>
            </View>
            <View style={[styles.borderTR, styles.flex1, LG_ROW_HEIGHT]}>
              <Text>探伤</Text>
            </View>
          </View>
        </View>
        <View style={[styles.flex1]}>
          <View style={[styles.borderTR, BASIC_ROW_HEIGHT]}>
            <Text>缺陷编号</Text>
          </View>
          <View style={[styles.flexRow]}>
            <View style={[styles.borderTR, styles.flex1, LG_ROW_HEIGHT]}>
              <Text>1</Text>
            </View>
            <View style={[styles.borderTR, styles.flex1, LG_ROW_HEIGHT]}>
              <Text>2</Text>
            </View>
            <View style={[styles.borderTR, styles.flex1, LG_ROW_HEIGHT]}>
              <Text>3</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Body rows */}
      <View style={[styles.flexRow]}>
        {/* Column 1 */}
        <View style={[styles.flex1, styles.flexRow]}>
          <View style={[styles.flex1]}>
            <View
              style={[
                styles.borderTR,
                styles.justifyCenter,
                styles.itemsCenter,
                { height: BASIC_ROW_HEIGHT.height * 3 },
              ]}
            >
              <Text>轴</Text>
              <Text>颈</Text>
            </View>
          </View>
          <View style={[styles.flex1]}>
            <View style={[styles.borderTR, BASIC_ROW_HEIGHT]}>
              <Text>CT</Text>
            </View>
            <View style={[styles.borderTR, BASIC_ROW_HEIGHT]}>
              <Text>A1</Text>
            </View>
            <View style={[styles.borderTR, BASIC_ROW_HEIGHT]}>
              <Text>A2</Text>
            </View>
          </View>
          <View style={[styles.flex1]}>
            <View style={[styles.borderTR, BASIC_ROW_HEIGHT]}>
              <Text>0</Text>
            </View>
            <View style={[styles.borderTR, BASIC_ROW_HEIGHT]}>
              <Text>225</Text>
            </View>
            <View style={[styles.borderTR, BASIC_ROW_HEIGHT]}>
              <Text>260</Text>
            </View>
          </View>
        </View>
        {/* Column 2 */}
        <View style={[styles.flex1, styles.flexRow]}>
          <View style={[styles.flex1]}>
            <View style={[styles.flex1, styles.borderTR, BASIC_ROW_HEIGHT]}>
              <Text>24</Text>
            </View>
            <View style={[styles.flex1, styles.borderTR, BASIC_ROW_HEIGHT]}>
              <Text>9</Text>
            </View>
            <View style={[styles.flex1, styles.borderTR, BASIC_ROW_HEIGHT]}>
              <Text>33</Text>
            </View>
          </View>
          <View style={[styles.flex1]}>
            <View
              style={[styles.flex1, styles.borderTR, BASIC_ROW_HEIGHT]}
            ></View>
            <View
              style={[styles.flex1, styles.borderTR, BASIC_ROW_HEIGHT]}
            ></View>
            <View
              style={[styles.flex1, styles.borderTR, BASIC_ROW_HEIGHT]}
            ></View>
          </View>
          <View style={[styles.flex1]}>
            <View
              style={[styles.flex1, styles.borderTR, BASIC_ROW_HEIGHT]}
            ></View>
            <View
              style={[styles.flex1, styles.borderTR, BASIC_ROW_HEIGHT]}
            ></View>
            <View
              style={[styles.flex1, styles.borderTR, BASIC_ROW_HEIGHT]}
            ></View>
          </View>
        </View>
        {/* Column 3 */}
        <View style={[styles.flex1]}>
          <View style={[styles.flex1]}>
            <View style={[styles.borderTR, styles.flex1]}></View>
          </View>
          <View style={[styles.flex1, styles.flexRow]}>
            <View style={[styles.borderTR, styles.flex1]}></View>
            <View style={[styles.borderTR, styles.flex1]}></View>
            <View style={[styles.borderTR, styles.flex1]}></View>
          </View>
          <View style={[styles.flex1, styles.flexRow]}>
            <View style={[styles.borderTR, styles.flex1]}></View>
            <View style={[styles.borderTR, styles.flex1]}></View>
            <View style={[styles.borderTR, styles.flex1]}></View>
          </View>
        </View>
      </View>
    </>
  );
};

const SignatureTable = () => (
  <View style={[styles.font12, styles.borderBL]}>
    <View style={[styles.flexRow]}>
      <View
        style={[
          styles.borderR,
          styles.width20,
          styles.justifyCenter,
          styles.itemsCenter,
        ]}
      >
        <Text>签字签章</Text>
      </View>
      <View style={[styles.width80]}>
        <View style={[styles.flexRow]}>
          <View style={[styles.flex1, styles.borderR, styles.padding4]}>
            <Text>探伤工</Text>
          </View>
          <View style={[styles.flex1, styles.borderR, styles.padding4]}>
            <Text></Text>
          </View>
          <View style={[styles.flex1, styles.borderR, styles.padding4]}>
            <Text>探伤工长</Text>
          </View>
          <View style={[styles.flex1, styles.borderR, styles.padding4]}>
            <Text></Text>
          </View>
        </View>
        <View style={[styles.flexRow]}>
          <View style={[styles.flex1, styles.borderTR, styles.padding4]}>
            <Text>质检员</Text>
          </View>
          <View style={[styles.flex1, styles.borderTR, styles.padding4]}>
            <Text></Text>
          </View>
          <View style={[styles.flex1, styles.borderTR, styles.padding4]}>
            <Text>验收员</Text>
          </View>
          <View style={[styles.flex1, styles.borderTR, styles.padding4]}>
            <Text></Text>
          </View>
        </View>
      </View>
    </View>
    <View style={[styles.flexRow]}>
      <View style={[styles.width20, styles.borderTR, styles.padding4]}>
        <Text>备注</Text>
      </View>
      <View style={[styles.width80, styles.borderTR]}>
        <Text></Text>
      </View>
    </View>
  </View>
);

const ReportDoc = () => {
  const IMAGE_HEIGHT = 150;
  const of13 = of(13);

  return (
    <Document>
      {/* 第一页 */}
      <Page size="A4" style={[styles.page, styles.font10, styles.textCenter]}>
        <PageHeader>辆货统-501</PageHeader>
        <ReportTitle>
          铁路货车轮轴多通道超声波自动探伤系统日常性能校验记录表
        </ReportTitle>
        <TableHeader />
        <EquipmentTable />
        <View style={[styles.flexRow, styles.borderBL]}>
          <View
            style={[
              styles.borderTR,
              styles.itemsCenter,
              styles.justifyCenter,
              styles.padding6,
            ]}
          >
            <Text>{"R\nD\n2\n试\n样\n轴\n轮\n座\n人\n工\n缺\n陷\n编\n号"}</Text>
          </View>
          {of(2).map((dir) => {
            return (
              <View key={dir} style={[styles.flex1]}>
                <LZInfoTable />
                {of13.map((no) => {
                  return (
                    <View key={no} style={[styles.flexRow]}>
                      <View
                        style={[
                          styles.width40,
                          styles.borderTR,
                          styles.padding4,
                          styles.justifyCenter,
                          styles.itemsCenter,
                        ]}
                      >
                        <Text>{no}</Text>
                      </View>
                      <View style={[styles.borderTR, styles.flex1]}></View>
                      <View style={[styles.borderTR, styles.flex1]}></View>
                      <View style={[styles.borderTR, styles.flex1]}></View>
                    </View>
                  );
                })}
                <XHCTable />
              </View>
            );
          })}
        </View>
        <SignatureTable />
        <PageFooter>第 1 页</PageFooter>
      </Page>

      {/* 第二页 */}
      <Page size="A4" style={styles.page}>
        <PageHeader>辆货统-501</PageHeader>
        <ReportTitle>
          铁路货车轮轴超声波自动探伤系统日常性能校验记录表（第2页）
        </ReportTitle>
        <TableHeader />
        <View style={[styles.borderBL, styles.font12, styles.fontBold]}>
          <View style={[styles.flexRow]}>
            <View style={[styles.flex1, styles.borderTR, styles.padding2]}>
              <Text>左轴颈根部扫描图</Text>
            </View>
            <View style={[styles.flex1, styles.borderTR, styles.padding2]}>
              <Text>右轴颈根部扫描图</Text>
            </View>
          </View>
          <View style={[styles.flexRow, { height: IMAGE_HEIGHT }]}>
            <View style={[styles.flex1, styles.borderTR]} />
            <View style={[styles.flex1, styles.borderTR]} />
          </View>
          <View style={[styles.flexRow]}>
            <View style={[styles.flex1, styles.borderTR, styles.padding2]}>
              <Text>左轴颈根部扫描图</Text>
            </View>
            <View style={[styles.flex1, styles.borderTR, styles.padding2]}>
              <Text>右轴颈根部扫描图</Text>
            </View>
          </View>
          <View style={[styles.flexRow, { height: IMAGE_HEIGHT }]}>
            <View style={[styles.flex1, styles.borderTR]} />
            <View style={[styles.flex1, styles.borderTR]} />
          </View>
          <View style={[styles.borderTR, styles.padding2]}>
            <Text>左穿透扫描图</Text>
          </View>
          <View style={[styles.borderTR, { height: IMAGE_HEIGHT }]}></View>
          <View style={[styles.borderTR, styles.padding2]}>
            <Text>右穿透扫描图</Text>
          </View>
          <View style={[styles.borderTR, { height: IMAGE_HEIGHT }]}></View>
        </View>
        <PageFooter>第 2 页</PageFooter>
      </Page>
    </Document>
  );
};

export const Component = () => {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <ReportDoc />
    </PDFViewer>
  );
};
